let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
morgan.token("body", function getBody(req) {
    return req.body;
});
const app = express();
app.use(express.json());
app.use(
    morgan(function (tokens, req, res) {
        const method = tokens.method(req, res);
        const result = [
            method,
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
        ];
        if (method === "POST") result.push(JSON.stringify(tokens.body(req)));
        return result.join(" ");
    })
);
app.use(cors());
app.use(express.static("dist"));

app.get("/info", (req, res) => {
    const date = new Date();
    const numOfPpl = persons.length;
    res.send(`<p>Phonebook has info on ${numOfPpl} people</p><p>${date}</p>`);
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find((p) => p.id === id);

    if (person) res.json(person);
    else res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    persons = persons.filter((p) => p.id !== id);

    res.status(204).end();
});

app.post("/api/persons", (req, res) => {
    const body = req.body;

    if (!body.name || !body.number)
        res.status(400).json({ error: "name or number missing" });
    else if (persons.find((p) => p.name === body.name))
        res.status(400).json({ error: "name must be unique" });
    else {
        const person = {
            id: String(Math.round(Math.random() * 10000000)),
            name: body.name,
            number: body.number,
        };
        persons = persons.concat(person);

        res.json(person);
    }
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log("Server running on port " + PORT);
