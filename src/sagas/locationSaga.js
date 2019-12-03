import {all, call, put, takeEvery} from "@redux-saga/core/effects";
import {LOCATION_FAILED, LOCATION_REQUESTED, LOCATION_STARTED, LOCATION_SUCCEEDED} from "../actions";


export default function* locationSaga() {
    yield all([
        takeEvery(LOCATION_REQUESTED, updateLocation),
        updateLocation()
    ])
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