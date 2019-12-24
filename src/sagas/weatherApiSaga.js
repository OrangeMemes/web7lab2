import {all, call, put, takeEvery} from "@redux-saga/core/effects";
import {
    ADD_CITY,
    ENRICH_CITY_BY_NAME,
    ENRICH_LOCAL_CITY,
    LOCATION_SUCCEEDED,
    REMOVE_CITY_BY_NAME,
    SET_CURRENT_CITY
} from "../actions";
import {notification} from "antd";


export default function* weatherApiSaga() {
    yield all([
        takeEvery([ADD_CITY, SET_CURRENT_CITY], getInfoByCityName),
        takeEvery(LOCATION_SUCCEEDED, getInfoByLocation),
    ]);
}

function* getInfoByCityName(action) {
    let request = `/api/weather?city=${action.payload.name}`;
    let responsePayload = yield* makeApiCall(request);
    responsePayload.originalName = responsePayload.name;
    responsePayload.name = action.payload.name;
    if (responsePayload.hasFatalError) {
        yield put({type: REMOVE_CITY_BY_NAME, payload: responsePayload});
        notification.warning({
            message: `Город ${action.payload.name} не найден`,
            description:
                'Мы удалили его, потому что без данных о погоде порадовать вас всё равно нечем',
            duration: 0
        });
    } else {
        yield put({type: ENRICH_CITY_BY_NAME, payload: responsePayload});
    }
}


function* getInfoByLocation(action) {
    let request = `/api/weather/coordinates?lat=${action.payload.latitude}&long=${action.payload.longitude}`;
    let responsePayload = yield* makeApiCall(request);
    yield put({type: ENRICH_LOCAL_CITY, payload: responsePayload});
}


function* makeApiCall(request) {
    let response = yield call(fetch, request);
    if (response.status === 200) {
        return yield call([response, response.json]);
    } else if (response.status === 404) {
        return {error: "Город не найден", hasFatalError: true}
    } else {
        return {error: "Непредвиденная ошибка. Пожалуйста, попробуйте позже", hasFatalError: false}
    }
}