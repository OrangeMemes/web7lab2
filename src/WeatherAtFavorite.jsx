import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Button from "antd/es/button";
import {WeatherInfo} from "./WeatherInfo";
import React, {Component} from "react";
import {SmallCity} from "./SmallCity";
import {Icon} from "antd";
import {dispatchRemoveCity} from "./actions";
import {connect} from "react-redux";
import Spin from "antd/es/spin";

class WeatherAtFavorite extends Component {
    render() {
        return <section className="favorite-city">
            <Row type="flex" justify="space-between" align="middle">
                <Col span={20}>
                    <SmallCity name={this.props.city.name} iconUrl={this.props.city.icon}
                               temperature={this.props.city.temperature}/>
                </Col>
                <Col>
                    <Button type="default" shape="circle" size="large"
                            onClick={() => this.props.removeCity(this.props.number)}><Icon
                        type="delete"/></Button>
                </Col>
            </Row>

            <Spin spinning={this.props.city.isLoading}>
                <WeatherInfo
                    weatherParams={this.props.city}
                />
            </Spin>
        </section>;
    }
}

const mapDispatchToProps = {removeCity: dispatchRemoveCity};
export default connect(null, mapDispatchToProps)(WeatherAtFavorite)