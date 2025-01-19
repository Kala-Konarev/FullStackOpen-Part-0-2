import { useEffect } from "react";
import weatherService from "../services/weather";
import { useState } from "react";
/* eslint-disable react/prop-types */
const WeatherData = ({ capital }) => {
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        weatherService.getWeather(capital).then((r) =>
            setWeather({
                temperature: r.main.temp,
                wind: r.wind.speed,
                icon: r.weather[0].icon,
            })
        );
    }, [capital]);
    if (weather === null) return null;
    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>temperature {weather.temperature} degrees Celcius</p>
            <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            />
            <p>wind {weather.wind} m/s</p>
        </div>
    );
};

export default WeatherData;
