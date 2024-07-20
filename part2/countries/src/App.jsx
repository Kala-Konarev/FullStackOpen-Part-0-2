import { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./components/CountryList";
import CountryDisplay from "./components/CountryDisplay";

const App = () => {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);
    const [countriesToShow, setCountriesToShow] = useState([]);

    const url = "https://studies.cs.helsinki.fi/restcountries/api";

    useEffect(() => {
        axios
            .get(`${url}/all`)
            .then((response) => response.data)
            .then((countries) => {
                setCountries(countries);
                setCountriesToShow(countries);
            });
    }, []);

    const handleSearch = (event) => {
        const filter = event.target.value;
        setSearch(filter);
        const filteredCountries = countries.filter((country) =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
        );

        setCountriesToShow(filteredCountries);
    };

    if (countriesToShow.length === 1)
        return (
            <div>
                find countries
                <input value={search} onChange={handleSearch} />
                <CountryDisplay countryDetails={countriesToShow[0]} />;
            </div>
        );
    else
        return (
            <div>
                find countries
                <input value={search} onChange={handleSearch} />
                <CountryList
                    countries={countriesToShow.map((c) => c.name.common)}
                />
            </div>
        );
};

export default App;
