import {all, put, select, takeEvery} from "@redux-saga/core/effects";
import {ADD_CITY, REMOVE_CITY_BY_INDEX, REMOVE_CITY_BY_NAME} from "../actions";


export default function* localStorageSaga() {
    yield* readFavoritesLocalStorage();
    yield takeEvery([ADD_CITY, REMOVE_CITY_BY_INDEX, REMOVE_CITY_BY_NAME], updateFavoritesLocalStorage);
}

function* updateFavoritesLocalStorage() {
    let favorites = yield select(state => state.favorites.map(city => city.name));
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function* readFavoritesLocalStorage() {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    yield all(favorites.map(cityName => put({type: ADD_CITY, payload: cityName})))
}