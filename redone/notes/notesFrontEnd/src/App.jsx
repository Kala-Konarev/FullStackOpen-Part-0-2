import { useState, useEffect } from "react";
import noteService from "./services/notes";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        noteService.getAll().then((response) => {
            setNotes(response);
        });
    }, []);

    const handleChange = (e) => {
        setNewNote(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const n = {
            content: newNote,
            important: Math.random() < 0.5,
        };
        noteService.create(n).then((resp) => {
            setNotes(notes.concat(resp));
            setNewNote("");
        });
    };

    const toggleImportance = (id) => {
        const noteCopy = { ...notes.find((n) => n.id === id) };
        noteCopy.important = !noteCopy.important;

        noteService
            .update(id, noteCopy)
            .then((resp) => {
                setNotes(notes.map((n) => (n.id === id ? resp : n)));
            })
            .catch(() => {
                setError(`Note ${noteCopy.content} has already been deleted.`);
                setTimeout(() => {
                    setError(null);
                }, 5000);
                setNotes(notes.filter((n) => n.id !== id));
            });
    };

    const notesToShow = showAll ? notes : notes.filter((n) => n.important);
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={error} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    {showAll ? "important" : "all"}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportance(note.id)}
                    />
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input value={newNote} onChange={handleChange} />
                <button type="submit">Save note</button>
            </form>
            <Footer />
        </div>
    );
};

export default App;
