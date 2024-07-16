/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticsLine = ({ text, value }) => {
    return (
        <p>
            {text} {value} {text === "percentage" ? "%" : ""}
        </p>
    );
};
const Statistics = ({ good, neutral, bad }) => {
    if (good === 0 && neutral === 0 && bad === 0)
        return (
            <div>
                <p>No feedback given</p>
            </div>
        );
    const total = good + bad + neutral;
    const average = (good - bad) / total;
    const percentage = (good / total) * 100;
    return (
        <div>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={total} />
            <StatisticsLine text="average" value={average} />
            <StatisticsLine text="percentage" value={percentage} />
        </div>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const reactGood = () => setGood(good + 1);
    const reactNeutral = () => setNeutral(neutral + 1);
    const reactBad = () => setBad(bad + 1);

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={reactGood} text="good" />
            <Button onClick={reactNeutral} text="neutral" />
            <Button onClick={reactBad} text="bad" />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
