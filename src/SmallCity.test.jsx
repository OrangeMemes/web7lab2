import renderer from "react-test-renderer";
import React from "react";
import {SmallCity} from "./SmallCity";

it("Информация о погоде на небольшом компоненте", () => {
    const component = renderer.create(<SmallCity
        name={"Stockholm"}
        iconUrl={"http://openweathermap.org/img/wn/03n@2x.png"}
        temperature={-5.68}
    />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});