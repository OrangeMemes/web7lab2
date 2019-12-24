import {createAction} from "redux-act";

export const FAVORITES_REQUESTED = "FAVORITES_REQUESTED";
export const UNLOCK_FAVORITES = "UNLOCK_FAVORITES";
export const FAVORITES_FAILED = "FAVORITES_FAILED";
export const LOCK_FAVORITES = "LOCK_FAVORITES";
export const REQUEST_ADD_CITY = "REQUEST_ADD_CITY";
export const ADD_CITY = "ADD_CITY";
export const REQUEST_REMOVE_CITY_BY_ID = "REQUEST_REMOVE_CITY_BY_ID";
export const REMOVE_CITY_BY_ID = "REMOVE_CITY_BY_ID";
export const REMOVE_CITY_BY_NAME = "REMOVE_CITY_BY_NAME";
export const ENRICH_CITY_BY_NAME = "ENRICH_CITY_BY_NAME";
export const ENRICH_LOCAL_CITY = "ENRICH_LOCAL_CITY";
export const LOCATION_REQUESTED = "LOCATION_REQUESTED";
export const LOCATION_STARTED = "LOCATION_STARTED";
export const LOCATION_SUCCEEDED = "LOCATION_SUCCEEDED";
export const LOCATION_FAILED = "LOCATION_FAILED";
export const SET_CURRENT_CITY = "SET_CURRENT_CITY";

export const dispatchAddCity = createAction(REQUEST_ADD_CITY, (name) => name);
export const dispatchRemoveCity = createAction(REQUEST_REMOVE_CITY_BY_ID, (number) => number);
export const dispatchLocationRequest = createAction(LOCATION_REQUESTED);
export const dispatchSetCurrentCity = createAction(SET_CURRENT_CITY, (name) => ({name}));
export const dispatchFavoritesRequest = createAction(FAVORITES_REQUESTED);