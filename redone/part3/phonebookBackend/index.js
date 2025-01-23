require("dotenv").config();
const Person = require("./models/person");

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
    Person.find({}).then((persons) => res.json(persons));
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    Person.findById(id).then((person) => res.json(person));
});

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    persons = persons.filter((p) => p.id !== id);

    res.status(204).end();
});

app.post("/api/persons", (req, res) => {
    const name = req.body.name;
    const number = req.body.number;

    if (!name || !number)
        res.status(400).json({ error: "name or number missing" });
    else {
        const person = new Person({
            name: name,
            number: number,
        });

        person.save().then((savedPerson) => {
            res.json(savedPerson);
        });
    }
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log("Server running on port " + PORT);
