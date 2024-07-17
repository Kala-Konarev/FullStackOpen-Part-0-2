/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";

import Form from "./components/Form";
import ContactDisplay from "./components/ContactDisplay";
import Filter from "./components/Filter";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState(""); //current value for name input
    const [newNum, setNewNum] = useState(""); //current value for number input
    const [newFilter, setNewFilter] = useState(""); //current value for filter input

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then((response) => setPersons(response.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const exists = persons.find((p) => p.name === newName);
        if (exists) {
            alert(`${newName} is already added to the phonebook`);
        } else {
            const newPersons = persons.concat({
                name: newName,
                number: newNum,
            });
            setPersons(newPersons);
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
    const handleFilterChange = (e) => {
        setNewFilter(e.target.value);
    };

    let peopleToShow = persons.filter((p) =>
        p.name.toLowerCase().includes(newFilter)
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                handleFilterChange={handleFilterChange}
                newFilter={newFilter}
            />
            <h2>Add a new contact</h2>
            <Form
                handleSubmit={handleSubmit}
                handleNameChange={handleNameChange}
                handleNumChange={handleNumChange}
                newName={newName}
                newNum={newNum}
            />
            <h2>Numbers</h2>
            <ContactDisplay peopleToShow={peopleToShow} />
        </div>
    );
};

export default App;
