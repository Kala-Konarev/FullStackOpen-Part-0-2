import { useEffect, useState } from "react";
import axios from "axios";
const CountryDisplay = ({ countryDetails }) => {
    const api_key = import.meta.env.VITE_API_KEY;
    const name = countryDetails.name.common;
    const capital = countryDetails.capital;
    const area = countryDetails.area;
    const languages = Object.values(countryDetails.languages);
    const flagUrl = countryDetails.flags.png;
    const [weather, setWeather] = useState(null);
    const getUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`;
    useEffect(() => {
        axios
            .get(getUrl)
            .then((resp) => resp.data)
            .then((data) => {
                setWeather(data);
                console.log(data);
            });
    }, [getUrl]);
    return name ? (
        <div>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <h4>languages:</h4>
            <ul>
                {languages.map((l) => (
                    <li key={l}>{l}</li>
                ))}
            </ul>
            <img src={flagUrl} />
            <h1>Weather in {capital}</h1>
            {weather && (
                <>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    />
                    <p>
                        temperature {(weather.main.temp - 273.15).toFixed(2)}{" "}
                        Celcius
                    </p>
                    <p>wind {weather.wind.speed} m/s</p>
                </>
            )}
        </div>
    ) : null;
};
export default CountryDisplay;
