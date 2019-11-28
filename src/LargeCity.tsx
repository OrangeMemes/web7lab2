import Row from "antd/es/grid/row";
import Title from "antd/es/typography/Title";
import Col from "antd/es/grid/col";
import React from "react";
import CyrillicToTranslit from "cyrillic-to-translit-js";

export function LargeCity(props: { name: string, iconUrl: string, temperature: string }) {
    return <div className="large-city">
        <Row>
            <Title level={2}>{new CyrillicToTranslit().reverse(props.name)}</Title>
        </Row>
        <Row type="flex" align="top">
            {props.iconUrl && <Col><img src={props.iconUrl} alt={"icon"} className="weather-icon"/></Col>}
            <Col><Title>{props.temperature} ℃</Title></Col>
        </Row>
    </div>
}