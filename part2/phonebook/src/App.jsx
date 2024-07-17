/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
const Contact = ({ name }) => {
    return <p>{name}</p>;
};
const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const exists = persons.find((p) => p.name === newName);
        if (exists) {
            alert(`${newName} is already added to the phonebook`);
        } else {
            setPersons(persons.concat({ name: newName }));
            setNewName("");
        }
    };

    const handleChange = (e) => {
        setNewName(e.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input onChange={handleChange} value={newName} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((p) => (
                <Contact name={p.name} key={p.name} />
            ))}
        </div>
    );
};

export default App;
