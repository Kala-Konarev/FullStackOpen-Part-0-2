const CountryList = ({ countries }) => {
    if (countries.length > 10) {
        return <div>Too many matches, please specify another filter</div>;
    }
    if (countries.length > 1) {
        return (
            <div>
                {countries.map((country) => (
                    <div key={country}>{country}</div>
                ))}
            </div>
        );
    }

    return null;
};

export default CountryList;
