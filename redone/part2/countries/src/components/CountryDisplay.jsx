/* eslint-disable react/prop-types */
import WeatherData from "./WeatherData";
const CountryDisplay = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            {Object.values(country.languages).map((l) => (
                <li key={l}>{l}</li>
            ))}
            <img src={country.flags.png} alt={country.flags.alt} />
            <WeatherData capital={country.capital} />
        </div>
    );
};

export default CountryDisplay;
