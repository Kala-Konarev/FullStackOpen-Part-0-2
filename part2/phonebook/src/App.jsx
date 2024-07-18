import { useState, useEffect } from "react";

import personsService from "./services/persons";
import Notification from "./components/Notification";
import Form from "./components/Form";
import ContactDisplay from "./components/ContactDisplay";
import Filter from "./components/Filter";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState(""); //current value for name input
    const [newNum, setNewNum] = useState(""); //current value for number input
    const [newFilter, setNewFilter] = useState(""); //current value for filter input
    const [message, setMessage] = useState(null);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        personsService
            .getAll()
            .then((initialPersons) => setPersons(initialPersons));
    }, []);

    const changeContact = (id, newPerson) => {
        personsService
            .update(id, newPerson)
            .then((updated) => {
                setPersons(persons.map((p) => (p.id !== id ? p : updated)));
                setNewName("");
                setNewNum("");
                setMessage(`Updated ${updated.name}`);
                setHasError(false);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            })
            .catch(() => {
                setMessage(
                    `Information of ${newPerson.name} has already been removed from the server`
                );
                setHasError(true);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            });
    };
    const addContact = (newPerson) => {
        personsService.create(newPerson).then((createdPerson) => {
            setPersons(persons.concat(createdPerson));
            setNewName("");
            setNewNum("");
            setMessage(`Added ${createdPerson.name}`);
            setHasError(false);
            setTimeout(() => {
                setMessage(null);
            }, 5000);
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
            <Notification message={message} hasError={hasError} />
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
