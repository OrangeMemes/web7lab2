import {LocationStatus} from "./locationStatuses";
import renderer from "react-test-renderer";
import React from "react";
import {WeatherHere} from "./WeatherHere";

describe("Блок 'Погода здесь'", () => {
    const city = (status) => ({
        locationStatus: status,
        isLoading: false,
        name: 'Stockholm',
        icon: 'http://openweathermap.org/img/wn/10n@2x.png',
        temperature: 2.96,
        wind: 8.2,
        clouds: 'moderate rain',
        pressure: 1003,
        humidity: 93,
        latitude: 59.33,
        longitude: 18.07
    });

    it("Отображение в статусе LOADING", () => {

        const component = renderer.create(<WeatherHere
            city={city(LocationStatus.LOADING)}
        />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Отображение в статусе FAILED", () => {

        const component = renderer.create(<WeatherHere
            city={city(LocationStatus.FAILED)}
        />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Отображение в статусе OVERRIDDEN", () => {

        const component = renderer.create(<WeatherHere
            city={city(LocationStatus.OVERRIDDEN)}
        />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Отображение в статусе SUCCESS", () => {

        const component = renderer.create(<WeatherHere
            city={city(LocationStatus.SUCCESS)}
        />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});