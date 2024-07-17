/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Form from "./components/Form";
import ContactDisplay from "./components/ContactDisplay";
import Filter from "./components/Filter";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState(""); //current value for name input
    const [newNum, setNewNum] = useState(""); //current value for number input
    const [newFilter, setNewFilter] = useState(""); //current value for filter input
    const [peopleToShow, setPeopleToShow] = useState(persons);

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
            setPeopleToShow(
                newPersons.filter((p) =>
                    p.name.toLowerCase().includes(newFilter)
                )
            );
        }
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };
    const handleNumChange = (e) => {
        setNewNum(e.target.value);
    };

    const handleFilterChange = (e) => {
        const filter = e.target.value;
        setNewFilter(filter);
        setPeopleToShow(
            persons.filter((p) => p.name.toLowerCase().includes(filter))
        );
    };
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
