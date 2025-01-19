/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticsLine = ({ count, text }) => (
    <tr>
        <td>{text}</td>
        <td>{count}</td>
    </tr>
);
const Statistics = ({ good, neutral, bad, total, avg, posPerc }) => {
    if (total == 0) {
        return <p>No feedback given!</p>;
    }
    return (
        <table>
            <tbody>
                <StatisticsLine count={good} text={"good"} />
                <StatisticsLine count={neutral} text={"neutral"} />
                <StatisticsLine count={bad} text={"bad"} />
                <StatisticsLine count={total} text={"all"} />
                <StatisticsLine count={avg} text={"avg"} />
                <StatisticsLine
                    count={posPerc * 100 + " %"}
                    text={"positive percentage"}
                />
            </tbody>
        </table>
    );
};
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const total = bad + good + neutral;
    const avg = (good - bad) / total;
    const posPerc = good / total;
    return (
        <div>
            <h1>give feedback</h1>
            <div>
                <Button onClick={() => setGood(good + 1)} text={"good"} />
                <Button
                    onClick={() => setNeutral(neutral + 1)}
                    text={"neutral"}
                />
                <Button onClick={() => setBad(bad + 1)} text={"bad"} />
            </div>
            <h1>statistics</h1>
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={total}
                avg={avg}
                posPerc={posPerc}
            />
        </div>
    );
};

export default App;
