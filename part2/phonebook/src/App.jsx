/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import personsService from "./services/persons";

import Form from "./components/Form";
import ContactDisplay from "./components/ContactDisplay";
import Filter from "./components/Filter";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState(""); //current value for name input
    const [newNum, setNewNum] = useState(""); //current value for number input
    const [newFilter, setNewFilter] = useState(""); //current value for filter input

    useEffect(() => {
        personsService
            .getAll()
            .then((initialPersons) => setPersons(initialPersons));
    }, []);

    const changeContact = (id, newPerson) => {
        personsService.update(id, newPerson).then((updated) => {
            setPersons(persons.map((p) => (p.id !== id ? p : updated)));
            setNewName("");
            setNewNum("");
        });
    };
    const addContact = (newPerson) => {
        personsService.create(newPerson).then((createdPerson) => {
            setPersons(persons.concat(createdPerson));
            setNewName("");
            setNewNum("");
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            number: newNum,
        };
        const existingPerson = persons.find((p) => p.name === newName);
        if (existingPerson) {
            const confirmed = window.confirm(
                `${newName} is already added to the phonebook, replace the old number with a new one?`
            );
            if (confirmed) {
                changeContact(existingPerson.id, newPerson);
            }
        } else {
            addContact(newPerson);
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
    const handleDelete = (id) => {
        const personToDelete = persons.find((p) => p.id === id);
        const confirmed = window.confirm(`Delete ${personToDelete.name}?`);
        if (confirmed) {
            personsService.remove(id).then((removed) => {
                const filteredPersons = persons.filter(
                    (p) => p.id !== removed.id
                );
                setPersons(filteredPersons);
            });
        }
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
            <ContactDisplay
                peopleToShow={peopleToShow}
                deleteFunc={handleDelete}
            />
        </div>
    );
};

export default App;
