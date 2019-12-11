import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import React from "react";

export function SmallCity(props) {
    return <div className="small-city">
        <Row type="flex" align="middle" justify="space-between">
            <Col><h2 className="favorite-title">{props.name}</h2></Col>
            <Col>
                <p className="temperature-at-favorite">{props.iconUrl &&
                <img src={props.iconUrl} alt={"icon"} className="weather-icon"/>}{props.temperature} ℃</p>
            </Col>
        </Row>
    </div>
}