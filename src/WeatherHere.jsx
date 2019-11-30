import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Title from "antd/es/typography/Title";
import Button from "antd/es/button";
import {LargeCity} from "./LargeCity";
import {WeatherInfo} from "./WeatherInfo";
import React from "react";
import {connect} from "react-redux";
import {Spin} from "antd";
import {dispatchLocationRequest, dispatchSetCurrentCity} from "./actions";
import Search from "antd/es/input/Search";
import {LocationStatus} from "./reducers";
import Result from "antd/es/result";


function WeatherHere(props) {
    return <section className="header">
        <Spin spinning={props.city.locationStatus === LocationStatus.LOADING}>
            <Row type="flex" justify={"space-between"} align={"middle"}>

                <Col>
                    <Title>Погода здесь</Title>
                </Col>
                {props.city.locationStatus === LocationStatus.OVERRIDDEN &&
                <Col span={10}>
                    <Search enterButton size="large" onSearch={props.setCity} placeholder="Ввести вручную"/>
                </Col>
                }
                {props.city.locationStatus !== LocationStatus.FAILED &&
                <Col>
                    <Button size="large" type="primary" id="refreshLocationButton"
                            onClick={props.requestLocationUpdate}>
                        {props.city.locationStatus === LocationStatus.OVERRIDDEN ?
                            "Определить город" :
                            "Обновить геолокацию"}
                    </Button>
                </Col>
                }
            </Row>
            {props.city.locationStatus !== LocationStatus.FAILED &&
            <Spin spinning={!!props.city.isLoading}>
                <Row type="flex" align="middle">
                    <Col span={12}>
                        <LargeCity name={props.city.name} iconUrl={props.city.icon}
                                   temperature={props.city.temperature}/>
                    </Col>
                    <Col span={12}>
                        <WeatherInfo
                            weatherParams={props.city}
                        />
                    </Col>
                </Row>
            </Spin>
            }
            {props.city.locationStatus === LocationStatus.FAILED &&
            <Result
                status="warning"
                title="Мы не смогли определить местоположение"
                subTitle="Возможно, оно просто выключено - проверьте в адресной строке браузера и попробуйте ещё раз. Кроме того, можно попробовать поискать свой город вручную"
                extra={<Button onClick={props.requestLocationUpdate}>Попробовать ещё раз</Button>}
            >
                <Search enterButton size="large" onSearch={props.setCity} placeholder="Ввести город вручную"/>
            </Result>
            }
        </Spin>
    </section>;
}

const mapStateToProps = state => ({
    city: state.local
});

const mapDispatchToProps = {requestLocationUpdate: dispatchLocationRequest, setCity: dispatchSetCurrentCity};
export default connect(mapStateToProps, mapDispatchToProps)(WeatherHere)