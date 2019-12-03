import update from 'immutability-helper';
import {
    ADD_CITY,
    ENRICH_CITY_BY_NAME,
    ENRICH_LOCAL_CITY,
    LOCATION_FAILED,
    LOCATION_STARTED,
    LOCATION_SUCCEEDED,
    REMOVE_CITY_BY_INDEX,
    REMOVE_CITY_BY_NAME,
    SET_CURRENT_CITY
} from "./actions";
import {LocationStatus} from "./locationStatuses";

function enrichCity(city, action) {
    let clearedCity = update(city, {$unset: ['error', 'name', 'icon', 'temperature', 'wind', 'clouds', 'pressure', 'humidity', 'latitude', 'longitude']});
    if (action.payload.error)
        return {
            ...clearedCity,
            isLoading: false,
            name: action.payload.name,
            error: action.payload.error
        };
    else
        return {
            ...clearedCity,
            isLoading: false,
            name: action.payload.name,
            icon: `http://openweathermap.org/img/wn/${action.payload.weather[0].icon}@2x.png`,
            temperature: action.payload.main.temp,
            wind: action.payload.wind.speed,
            clouds: action.payload.weather[0].description,
            pressure: action.payload.main.pressure,
            humidity: action.payload.main.humidity,
            latitude: action.payload.coord.lat,
            longitude: action.payload.coord.lon
        };
}

function enrichCityIfNameMatches(city, action) {
    return actionMatchesCityName(city, action) ? enrichCity(city, action) : city;
}

function actionMatchesCityName(city, action) {
    return city.name && (city.name === action.payload.name || city.name === action.payload.originalName);
}

export function localCityReducer(state = {}, action) {
    switch (action.type) {
        case ENRICH_CITY_BY_NAME:
            return enrichCityIfNameMatches(state, action);
        case LOCATION_STARTED:
            return update(state, {locationStatus: {$set: LocationStatus.LOADING}});
        case LOCATION_SUCCEEDED:
            return update(state, {
                    locationStatus: {$set: LocationStatus.SUCCESS},
                    isLoading: {$set: true}
                }
            );
        case LOCATION_FAILED:
            return update(state, {
                    locationStatus: {$set: LocationStatus.FAILED},
                    isLoading: {$set: false}
                }
            );
        case SET_CURRENT_CITY:
            return {
                name: action.payload,
                isLoading: true,
                locationStatus: LocationStatus.OVERRIDDEN
            };
        case ENRICH_LOCAL_CITY:
            return enrichCity(state, action);
        case REMOVE_CITY_BY_NAME:
            return actionMatchesCityName(state, action) ? {locationStatus: LocationStatus.FAILED} : state;
        default:
            return state;
    }
}

export function favoritesReducer(state = [], action) {
    switch (action.type) {
        case ADD_CITY:
            return update(state, {$push: [{name: action.payload, isLoading: true}]});
        case REMOVE_CITY_BY_INDEX:
            return update(state, {$splice: [[action.payload, 1]]});
        case ENRICH_CITY_BY_NAME:
            return state.map(city => enrichCityIfNameMatches(city, action));
        case REMOVE_CITY_BY_NAME:
            return state.filter(city => !actionMatchesCityName(city, action));
        default:
            return state;
    }
}