import {all, call, put, select, takeEvery} from "@redux-saga/core/effects";
import {
    ADD_CITY,
    ENRICH_CITY_BY_NAME,
    ENRICH_LOCAL_CITY,
    LOCATION_FAILED,
    LOCATION_REQUESTED,
    LOCATION_STARTED,
    LOCATION_SUCCEEDED,
    REMOVE_CITY_BY_INDEX,
    REMOVE_CITY_BY_NAME,
    SET_CURRENT_CITY
} from "./actions";
import {notification} from "antd";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const appId = "ec79c94c55ad6b69b834ef907b908f15";

function* getInfoByCityName(action) {
    let request = new URL(apiUrl);
    request.searchParams.append("units", "metric");
    request.searchParams.append("appid", appId);
    request.searchParams.append("q", action.payload);
    let responsePayload = yield makeApiCall(request);
    responsePayload.originalName = responsePayload.name;
    responsePayload.name = action.payload;
    if (responsePayload.hasFatalError) {
        yield put({type: REMOVE_CITY_BY_NAME, payload: responsePayload});
        notification.warning({
            message: `Город ${action.payload} не найден`,
            description:
                'Мы удалили его из Избранного, потому что без данных о погоде порадовать вас всё равно нечем',
            duration: 0
        });
    } else {
        yield put({type: ENRICH_CITY_BY_NAME, payload: responsePayload});
    }
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

function* getInfoByLocation(action) {
    let request = new URL(apiUrl);
    request.searchParams.append("units", "metric");
    request.searchParams.append("appid", appId);
    request.searchParams.append("lat", action.payload.latitude);
    request.searchParams.append("lon", action.payload.longitude);
    let responsePayload = yield makeApiCall(request);
    yield put({type: ENRICH_LOCAL_CITY, payload: responsePayload});
}

function* updateFavoritesLocalStorage() {
    let favorites = yield select(state => state.favorites.map(city => city.name));
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function* readFavoritesLocalStorage() {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    yield all(favorites.map(cityName => put({type: ADD_CITY, payload: cityName})))
}

const getUserLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
        location => resolve(location),
        error => reject(error),
    )
});

function* updateLocation() {
    yield put({type: LOCATION_STARTED});
    try {
        let location = yield call(getUserLocation);
        yield put({type: LOCATION_SUCCEEDED, payload: location.coords})
    } catch (error) {
        yield put({type: LOCATION_FAILED})
    }
}

export function* rootSaga() {
    yield takeEvery([ADD_CITY, SET_CURRENT_CITY], getInfoByCityName);
    yield takeEvery([ADD_CITY, REMOVE_CITY_BY_INDEX, REMOVE_CITY_BY_NAME], updateFavoritesLocalStorage);
    yield takeEvery(LOCATION_REQUESTED, updateLocation);
    yield takeEvery(LOCATION_SUCCEEDED, getInfoByLocation);
    yield readFavoritesLocalStorage();
    yield updateLocation();
}