import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Title from "antd/es/typography/Title";
import Search from "antd/es/input/Search";
import {Icon} from "antd";
import Empty from "antd/es/empty";
import React, {Component} from "react";
import WeatherAtFavorite from "./WeatherAtFavorite";
import {connect} from "react-redux";
import {dispatchAddCity} from "./actions";
import Tooltip from "antd/es/tooltip";

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {favoriteInput: ""};
    }

    addFavoriteCity = (name) => {
        if (name) {
            this.setState({favoriteInput: ""});
            this.props.addCity(name);
        }
    };

    handleChange = (event) => {
        this.setState({favoriteInput: event.target.value});
    };


    render() {
        return <section className="favorites">
            <Row type="flex" justify="space-between">
                <Col span={10}><Title>Избранное</Title></Col>
                <Col span={10}>
                    <Search
                        enterButton={<Icon type="plus"/>}
                        size="large"
                        placeholder="Добавить новый город"
                        onSearch={this.addFavoriteCity}
                        value={this.state.favoriteInput}
                        onChange={this.handleChange}
                        suffix={
                            <Tooltip
                                title="Названия городов, написанные кириллицей, находятся не всегда. Если не получилось найти город с первого раза, не отчаивайтесь и напишите его по-английски">
                                <Icon type="info-circle"/>
                            </Tooltip>
                        }

                    />
                </Col>
            </Row>
            {
                (!this.props.cities || this.props.cities.length === 0) &&
                <Empty
                    description={"Мы ничего не знаем о ваших любимых городах. Исправьте это с помощью поля справа вверху - подумайте, где часто бываете, или просто помечтайте"}
                />
            }
            <Row gutter={[16, 16]} align="bottom" type="flex">
                {
                    this.props.cities && this.props.cities.map((city, i) => <Col span={12} key={i}><WeatherAtFavorite
                        city={city} number={i}/></Col>)
                }
            </Row>
        </section>;
    }
}

const mapStateToProps = (state) => {
    return {
        cities: state.favorites
    }
};
const mapDispatchToProps = {addCity: dispatchAddCity};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favorites)

