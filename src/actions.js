import {createAction} from "redux-act";

export const ADD_CITY = "ADD_CITY";
export const REMOVE_CITY = "REMOVE_CITY";
export const ENRICH_CITY_BY_NAME = "ENRICH_CITY_BY_NAME";
export const ENRICH_LOCAL_CITY = "ENRICH_LOCAL_CITY";

export const LOCATION_REQUESTED = "LOCATION_REQUESTED";
export const LOCATION_STARTED = "LOCATION_STARTED";
export const LOCATION_SUCCEEDED = "LOCATION_SUCCEEDED";
export const LOCATION_FAILED = "LOCATION_FAILED";
export const SET_CURRENT_CITY = "SET_CURRENT_CITY";

export const dispatchAddCity = createAction(ADD_CITY, (name) => name);
export const dispatchRemoveCity = createAction(REMOVE_CITY, (number) => number);
export const dispatchLocationRequest = createAction(LOCATION_REQUESTED);
export const dispatchSetCurrentCity = createAction(SET_CURRENT_CITY, (name) => name);