import {Alert, Descriptions} from "antd";
import React from "react";
import CyrillicToTranslit from "cyrillic-to-translit-js";

export function WeatherInfo(props) {

    return !props.weatherParams.error ?
        <Descriptions bordered={true} column={1}>
            <Descriptions.Item label="Ветер">{props.weatherParams.wind} м/с</Descriptions.Item>
            <Descriptions.Item
                label="Облачность">{new CyrillicToTranslit().reverse(props.weatherParams.clouds)}</Descriptions.Item>
            <Descriptions.Item label="Давление">{props.weatherParams.pressure} гПа</Descriptions.Item>
            <Descriptions.Item label="Влажность">{props.weatherParams.humidity}%</Descriptions.Item>
            <Descriptions.Item
                label="Координаты">[{props.weatherParams.latitude}, {props.weatherParams.longitude}]</Descriptions.Item>
        </Descriptions> :
        <Alert
            message="Ошибка"
            description={props.weatherParams.error}
            type="error"
            showIcon
        />;
}