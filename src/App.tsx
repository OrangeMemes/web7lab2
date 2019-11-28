import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import WeatherHere from "./WeatherHere";
import Favorites from "./Favorites";

const App: React.FC = () => {
    return (
        <div className="App">
            <WeatherHere/>
            <Favorites/>
        </div>
    );
};

export default App;
