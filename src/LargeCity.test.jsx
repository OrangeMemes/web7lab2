import renderer from "react-test-renderer";
import React from "react";
import {LargeCity} from "./LargeCity";

it("Информация о погоде на крупном компоненте", () => {
    const component = renderer.create(<LargeCity
        name={"Malaya Okhta"}
        iconUrl={"http://openweathermap.org/img/wn/03n@2x.png"}
        temperature={-5.68}
    />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});