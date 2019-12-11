import renderer from "react-test-renderer";
import React from "react";
import {WeatherInfo} from "./WeatherInfo";

describe("Информация о погоде", () => {
    it("Когда нет ошибки", () => {
        const weatherParams = {
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
        };
        const component = renderer.create(<WeatherInfo
            weatherParams={weatherParams}
        />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Когда ошибка", () => {
        const weatherParams = {
            error: "еррор"
        };
        const component = renderer.create(<WeatherInfo
            weatherParams={weatherParams}
        />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});