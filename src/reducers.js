import update from 'immutability-helper';
import {
    ADD_CITY,
    ENRICH_CITY_BY_NAME,
    ENRICH_LOCAL_CITY,
    LOCATION_FAILED,
    LOCATION_STARTED,
    LOCATION_SUCCEEDED,
    REMOVE_CITY,
    SET_CURRENT_CITY
} from "./actions";

export const LocationStatus = {
    LOADING: "LOADING",
    FAILED: "FAILED",
    SUCCESS: "SUCCESS",
    OVERRIDDEN: "OVERRIDDEN"
};

function enrichCity(action, city) {
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

function enrichCityByName(action, city) {
    if (!city.name)
        return city;
    if (city.name === action.payload.name || city.name === action.payload.originalName) {
        return enrichCity(action, city);
    } else {
        return city
    }
}

export default function favorites(state = {}, action) {
    if (!state.favorites)
        state = update(state, {favorites: {$set: []}});
    if (!state.local)
        state = update(state, {local: {$set: {}}});

    switch (action.type) {
        case ADD_CITY:
            return update(state, {favorites: {$push: [{name: action.payload, isLoading: true}]}});
        case REMOVE_CITY:
            return update(state, {favorites: {$splice: [[action.payload, 1]]}});
        case ENRICH_CITY_BY_NAME:
            let enrichedFavorites = state.favorites.map(city => enrichCityByName(action, city));
            return update(state, {
                favorites: {$set: enrichedFavorites},
                local: {$set: enrichCityByName(action, state.local)}
            });
        case LOCATION_STARTED:
            return update(state, {local: {locationStatus: {$set: LocationStatus.LOADING}}});
        case LOCATION_SUCCEEDED:
            return update(state, {
                local: {
                    locationStatus: {$set: LocationStatus.SUCCESS},
                    isLoading: {$set: true}
                }
            });
        case LOCATION_FAILED:
            return update(state, {
                local: {
                    locationStatus: {$set: LocationStatus.FAILED},
                    isLoading: {$set: false}
                }
            });
        case SET_CURRENT_CITY:
            return update(state, {
                local: {
                    name: {$set: action.payload},
                    isLoading: {$set: true},
                    locationStatus: {$set: LocationStatus.OVERRIDDEN}
                }
            });
        case ENRICH_LOCAL_CITY:
            return update(state, {
                local: {$set: enrichCity(action, state.local)}
            });
        default:
            return state;
    }
}