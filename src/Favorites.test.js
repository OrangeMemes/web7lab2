import React from 'react';
import {Favorites} from "./Favorites";
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import {createStore} from "redux";
import {FavoritesStatus} from "./favoritesStatuses";

describe("Избранное", () => {
    it("Пустое избранное", () => {
        const component = renderer.create(<Favorites cities={[]} status={FavoritesStatus.AVAILABLE}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Избранное в состоянии загрузки", () => {
        const component = renderer.create(<Favorites cities={[]} status={FavoritesStatus.LOCKED}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Ошибка при загрузке избранного", () => {
        const component = renderer.create(<Favorites cities={[]} status={FavoritesStatus.FAILED}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("В избранном есть города", () => {
        const cities = [
            {
                isLoading: false,
                id: 1,
                name: 'Stockholm',
                icon: 'http://openweathermap.org/img/wn/10n@2x.png',
                temperature: 2.96,
                wind: 8.2,
                clouds: 'moderate rain',
                pressure: 1003,
                humidity: 93,
                latitude: 59.33,
                longitude: 18.07
            },
            {
                isLoading: false,
                id: 2,
                name: 'Oslo',
                icon: 'http://openweathermap.org/img/wn/10n@2x.png',
                temperature: 5.8,
                wind: 8.2,
                clouds: 'light rain',
                pressure: 987,
                humidity: 100,
                latitude: 59.91,
                longitude: 10.74
            }
        ];

        const component = renderer.create(<Provider store={createStore(() => {
        })}><Favorites cities={cities}/></Provider>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});