import {all} from "@redux-saga/core/effects";
import favoritesSaga from "./favoritesSaga";
import locationSaga from "./locationSaga";
import weatherApiSaga from "./weatherApiSaga";


export default function* rootSaga() {
    yield all([
        weatherApiSaga(),
        favoritesSaga(),
        locationSaga(),
    ]);
}