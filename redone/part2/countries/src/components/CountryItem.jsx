/* eslint-disable react/prop-types */
import { useState } from "react";
import CountryDisplay from "./CountryDisplay";
const CountryItem = ({ c }) => {
    const [pressed, setPressed] = useState(false);
    const handleClick = () => {
        setPressed(true);
    };
    if (!pressed) {
        return (
            <p key={c.cca3}>
                {c.name.common}
                <button onClick={handleClick}>show</button>
            </p>
        );
    } else {
        return <CountryDisplay country={c} />;
    }
};
export default CountryItem;
