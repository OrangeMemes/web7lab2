import {all} from "@redux-saga/core/effects";
import localStorageSaga from "./localStorageSaga";
import locationSaga from "./locationSaga";
import weatherApiSaga from "./weatherApiSaga";


export default function* rootSaga() {
    yield all([
        weatherApiSaga(),
        localStorageSaga(),
        locationSaga(),
    ]);
}