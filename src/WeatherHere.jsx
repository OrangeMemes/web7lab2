import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Title from "antd/es/typography/Title";
import Button from "antd/es/button";
import {LargeCity} from "./LargeCity";
import {WeatherInfo} from "./WeatherInfo";
import React, {Component} from "react";
import {connect} from "react-redux";
import {Spin} from "antd";
import {dispatchLocationRequest, dispatchSetCurrentCity} from "./actions";
import Search from "antd/es/input/Search";
import {LocationStatus} from "./reducers";
import Result from "antd/es/result";


class WeatherHere extends Component {
    render() {
        return <section className="header">
            <Spin spinning={this.props.city.locationStatus === LocationStatus.LOADING}>
                <Row type="flex" justify={"space-between"} align={"middle"}>

                    <Col span={7}>
                        <Title>Погода здесь</Title>
                    </Col>
                    {this.props.city.locationStatus === LocationStatus.OVERRIDDEN &&
                    <Col span={11}>
                        <Search enterButton size="large" onSearch={this.props.setCity}/>
                    </Col>
                    }
                    {this.props.city.locationStatus !== LocationStatus.FAILED &&
                    <Col>
                        <Button size="large" type="primary" id="refreshLocationButton"
                                onClick={this.props.requestLocationUpdate}>
                            Обновить геолокацию
                        </Button>
                    </Col>
                    }
                </Row>
                {this.props.city.locationStatus !== LocationStatus.FAILED &&
                <Spin spinning={!!this.props.city.isLoading}>
                    <Row type="flex" align="middle">
                        <Col span={12}>
                            <LargeCity name={this.props.city.name} iconUrl={this.props.city.icon}
                                       temperature={this.props.city.temperature}/>
                        </Col>
                        <Col span={12}>
                            <WeatherInfo
                                weatherParams={this.props.city}
                            />
                        </Col>
                    </Row>
                </Spin>
                }
                {this.props.city.locationStatus === LocationStatus.FAILED &&
                <Result
                    status="warning"
                    title="Мы не смогли определить местоположение"
                    subTitle="Возможно, оно просто выключено - проверьте в адресной строке браузера и попробуйте ещё раз. Кроме того, можно попробовать поискать свой город вручную"
                    extra={<Button onClick={this.props.requestLocationUpdate}>Попробовать ещё раз</Button>}
                >
                    <Search enterButton size="large" onSearch={this.props.setCity} placeholder="Ввести город вручную"/>
                </Result>
                }
            </Spin>
        </section>;
    }
}

const mapStateToProps = state => ({
    city: state.local
});

const mapDispatchToProps = {requestLocationUpdate: dispatchLocationRequest, setCity: dispatchSetCurrentCity};
export default connect(mapStateToProps, mapDispatchToProps)(WeatherHere)