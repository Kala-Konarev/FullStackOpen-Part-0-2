/* eslint-disable no-unused-vars */
const CountryDisplay = ({ countryDetails }) => {
    const name = countryDetails.name.common;
    const capital = countryDetails.capital;
    const area = countryDetails.area;
    const languages = Object.values(countryDetails.languages);
    const flagUrl = countryDetails.flags.png;

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
        </div>
    ) : null;
};
export default CountryDisplay;
