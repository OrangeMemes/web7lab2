import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Button from "antd/es/button";
import {WeatherInfo} from "./WeatherInfo";
import React from "react";
import {SmallCity} from "./SmallCity";
import {Icon} from "antd";
import {dispatchRemoveCity} from "./actions";
import {connect} from "react-redux";
import Spin from "antd/es/spin";

function WeatherAtFavorite(props) {
    return <section className="favorite-city">
        <Row type="flex" justify="space-between" align="middle">
            <Col span={21}>
                <SmallCity name={props.city.name} iconUrl={props.city.icon}
                           temperature={props.city.temperature}/>
            </Col>
            <Col>
                <Button type="default" shape="circle" size="large"
                        onClick={() => props.removeCity(props.number)}><Icon
                    type="delete"/></Button>
            </Col>
        </Row>

        <Spin spinning={props.city.isLoading}>
            <WeatherInfo
                weatherParams={props.city}
            />
        </Spin>
    </section>;
}

const mapDispatchToProps = {removeCity: dispatchRemoveCity};
export default connect(null, mapDispatchToProps)(WeatherAtFavorite)