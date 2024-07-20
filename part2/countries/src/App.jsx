import { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./components/CountryList";

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

    const showCountry = (country) => () => {
        setCountriesToShow([country]);
    };
    return (
        <div>
            find countries
            <input value={search} onChange={handleSearch} />
            <CountryList
                countries={countriesToShow}
                showCountry={showCountry}
            />
        </div>
    );
};

export default App;
