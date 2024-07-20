import CountryDisplay from "./CountryDisplay";

const CountryList = ({ countries, showCountry }) => {
    if (countries.length > 10) {
        return <div>Too many matches, please specify another filter</div>;
    }
    if (countries.length > 1) {
        return (
            <div>
                {countries.map((country) => {
                    const cName = country.name.common;
                    return (
                        <div key={cName}>
                            {cName}
                            <button onClick={showCountry(country)}>show</button>
                        </div>
                    );
                })}
            </div>
        );
    }
    if (countries.length === 1) {
        return <CountryDisplay countryDetails={countries[0]} />;
    }

    return null;
};

export default CountryList;
