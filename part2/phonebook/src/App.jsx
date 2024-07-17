/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
const Contact = ({ name, number }) => {
    return (
        <p>
            {name} {number}
        </p>
    );
};
const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: 120000 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNum, setNewNum] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const exists = persons.find((p) => p.name === newName);
        if (exists) {
            alert(`${newName} is already added to the phonebook`);
        } else {
            setPersons(persons.concat({ name: newName, number: newNum }));
            setNewName("");
            setNewNum("");
        }
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };
    const handleNumChange = (e) => {
        setNewNum(e.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name:{" "}
                    <input
                        required
                        onChange={handleNameChange}
                        value={newName}
                    />
                </div>
                <div>
                    number:{" "}
                    <input required onChange={handleNumChange} value={newNum} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((p) => (
                <Contact name={p.name} number={p.number} key={p.name} />
            ))}
        </div>
    );
};

export default App;
