import {all, call, put, select, takeEvery} from "@redux-saga/core/effects";
import {
    ADD_CITY,
    FAVORITES_FAILED,
    FAVORITES_REQUESTED,
    LOCK_FAVORITES,
    REMOVE_CITY_BY_ID,
    REMOVE_CITY_BY_NAME,
    REQUEST_ADD_CITY,
    REQUEST_REMOVE_CITY_BY_ID,
    UNLOCK_FAVORITES
} from "../actions";
import {notification} from "antd";


export default function* favoritesSaga() {
    yield takeEvery(FAVORITES_REQUESTED, getFavorites);
    yield takeEvery(REMOVE_CITY_BY_NAME, findByNameAndRemove);
    yield takeEvery(REQUEST_ADD_CITY, addCityToFavorites);
    yield takeEvery(REQUEST_REMOVE_CITY_BY_ID, removeFromFavorites);
    yield put({type: FAVORITES_REQUESTED})
}

function* getFavorites() {
    yield put({type: LOCK_FAVORITES});
    try {
        let favoritesResponse = yield call(fetch, '/api/favorites');
        if (favoritesResponse.status !== 200)
            throw new Error(favoritesResponse.status);
        let favorites = yield call([favoritesResponse, favoritesResponse.json]);
        yield all(favorites.map(city => put({type: ADD_CITY, payload: city})));
        yield put({type: UNLOCK_FAVORITES})
    } catch (error) {
        yield put({type: FAVORITES_FAILED, payload: error})
    }
}

function* findByNameAndRemove(action) {
    let favorites = yield select(state => state.favorites.cities);
    yield all(
        favorites
            .filter(city => city.name && city.name === action.payload.name)
            .map(city => put({type: REQUEST_REMOVE_CITY_BY_ID, payload: city.id}))
    )
}

function* addCityToFavorites(action) {
    yield put({type: LOCK_FAVORITES});
    try {
        let response = yield call(fetch, '/api/favorites',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({name: action.payload})
            }
        );
        if (response.status !== 200)
            throw 'HTTP код ответа ' + response.status;

        let body = yield call([response, response.json]);
        if (!body.id)
            throw 'Неожиданный ответ';

        yield put({type: ADD_CITY, payload: {name: action.payload, id: body.id}});
        yield put({type: UNLOCK_FAVORITES});
        notification.success({
            duration: 5,
            message: `Город ${action.payload} добавлен в избранное`
        })
    } catch (e) {
        yield put({type: UNLOCK_FAVORITES});
        notification.error({
            duration: 10,
            message: `Не удалось добавить город ${action.payload} в избранное`,
            description: formatError(e)
        })
    }
}

function formatError(e) {
    return typeof e === 'string' ? e : 'Неизвестная ошибка, попробуйте повторить попытку позднее';
}

function* removeFromFavorites(action) {
    yield put({type: LOCK_FAVORITES});
    try {
        let response = yield call(fetch, '/api/favorites?id=' + action.payload,
            {method: 'DELETE'}
        );
        if (response.status !== 200)
            throw 'HTTP код ответа ' + response.status;

        yield put({type: REMOVE_CITY_BY_ID, payload: action.payload});
        yield put({type: UNLOCK_FAVORITES});
    } catch (e) {
        yield put({type: UNLOCK_FAVORITES});
        notification.error({
            duration: 10,
            message: `Не удалось удалить город из избранного`,
            description: formatError(e)
        })
    }
}