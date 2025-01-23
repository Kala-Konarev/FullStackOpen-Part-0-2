import { useEffect, useState } from "react";
import personService from "./services/persons";
import FilterBar from "./components/FilterBar";
import PersonList from "./components/PersonList";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNum, setNewNum] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        personService.getAll().then((response) => setPersons(response));
    }, []);
    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };
    const handleNumChange = (e) => {
        setNewNum(e.target.value);
    };
    const handleFilterChange = (e) => {
        setNewFilter(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const existing = persons.find((p) => p.name === newName);
        if (existing) {
            if (
                window.confirm(
                    `${newName} already exists. Do you want to replace the number with a new one?`
                )
            ) {
                personService
                    .update(existing.id, { ...existing, number: newNum })
                    .then((response) => {
                        setPersons(
                            persons.map((p) =>
                                p.id === existing.id ? response : p
                            )
                        );
                        setMessage(
                            `Person ${newName}'s number has been changed to ${newNum}`
                        );
                    })
                    .catch((error) => {
                        console.log(error.response.data.error);
                        setMessage(`Error: ${error.response.data.error}`);
                        setIsError(true);
                    });

                setTimeout(() => {
                    setMessage(null);
                    setIsError(false);
                }, 5000);
            }
        } else {
            personService
                .create({ name: newName, number: newNum })
                .then((response) => {
                    setPersons(persons.concat(response));
                    setMessage(`Person ${newName} has been added to contacts`);
                })
                .catch((error) => {
                    console.log(error.response.data.error);
                    setMessage(`Error: ${error.response.data.error}`);
                    setIsError(true);
                });
            setTimeout(() => {
                setMessage(null);
                setIsError(false);
            }, 5000);
        }
        setNewName("");
        setNewNum("");
    };

    const handleDelete = (id) => () => {
        if (window.confirm("Do you want to delete this person?")) {
            personService
                .remove(id)
                .catch(() => {
                    setMessage(
                        "Error. Information for this person has already been deleted."
                    );
                    setIsError(true);
                    setTimeout(() => {
                        setMessage(null);
                        setIsError(false);
                    }, 5000);
                })
                .finally(() => setPersons(persons.filter((p) => p.id !== id)));
        }
    };

    const contactsToShow = persons.filter((p) => p.name.includes(newFilter));
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} isError={isError} />
            <FilterBar handleChange={handleFilterChange} filter={newFilter} />
            <h2>Add new contact</h2>
            <PersonForm
                handleNameChange={handleNameChange}
                name={newName}
                handleNumChange={handleNumChange}
                num={newNum}
                handleSubmit={handleSubmit}
            />
            <h2>Numbers</h2>
            <PersonList persons={contactsToShow} handleDelete={handleDelete} />
        </div>
    );
};

export default App;
