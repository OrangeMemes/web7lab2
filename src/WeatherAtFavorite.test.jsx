import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";
import React from "react";
import WeatherAtFavorite from "./WeatherAtFavorite";

it("Погода в избранном отображается", () => {
    const city = {
        isLoading: false,
        name: 'Oslo',
        icon: 'http://openweathermap.org/img/wn/10n@2x.png',
        temperature: 5.8,
        wind: 8.2,
        clouds: 'light rain',
        pressure: 987,
        humidity: 100,
        latitude: 59.91,
        longitude: 10.74
    };

    const component = renderer.create(<Provider store={createStore(() => {
    })}><WeatherAtFavorite city={city}/></Provider>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});