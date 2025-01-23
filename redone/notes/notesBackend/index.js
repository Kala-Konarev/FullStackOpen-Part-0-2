require("dotenv").config();

const Note = require("./models/note");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("short"));
app.use(express.static("dist"));

// const generateId = () => {
//     const maxId =
//         notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
//     return String(maxId + 1);
// };
app.get("/", (request, response) => {
    response.send("<h1>Hello world</h1>");
});

app.get("/api/notes", (request, response) => {
    Note.find({}).then((notes) => response.json(notes));
});

app.get("/api/notes/:id", (request, response) => {
    Note.findById(request.params.id).then((note) => response.json(note));
});

app.post("/api/notes", (request, response) => {
    const body = request.body;

    if (!body.content) {
        return response.status(400).json({
            error: "content missing",
        });
    }

    const note = new Note({
        content: body.content,
        important: Boolean(body.important) || false,
    });

    note.save().then((savedNote) => {
        response.json(savedNote);
    });
});

app.delete("/api/notes/:id", (request, response) => {
    notes = notes.filter((n) => n.id !== request.params.id);

    response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
