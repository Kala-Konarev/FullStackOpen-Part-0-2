import { useState, useEffect } from "react";
import countryService from "./services/countries";
import CountryDisplay from "./components/CountryDisplay";
import CountryItem from "./components/CountryItem";
function App() {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        countryService.getAll().then((resp) => {
            setCountries(resp);
            console.log(resp);
        });
    }, []);

    const countriesToShow = countries.filter((c) =>
        c.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    const toShow = () => {
        if (countriesToShow.length > 10) return "Too many matches";
        else if (countriesToShow.length > 1)
            return countriesToShow.map((c) => (
                <CountryItem key={c.cca3} c={c} />
            ));
        else if (countriesToShow.length === 1)
            return <CountryDisplay country={countriesToShow[0]} />;
        else return null;
    };
    return (
        <>
            <p>find countries</p>
            <input
                value={filter}
                onChange={(e) => {
                    setFilter(e.target.value);
                }}
            />
            {toShow()}
        </>
    );
}

export default App;
