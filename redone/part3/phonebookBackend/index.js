require("dotenv").config();
const Person = require("./models/person");

const express = require("express");
const morgan = require("morgan");
// const cors = require("cors");
// app.use(cors());
morgan.token("body", function getBody(req) {
    return req.body;
});
const app = express();
app.use(express.static("dist"));
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

app.get("/info", (req, res, next) => {
    const date = new Date();
    Person.countDocuments({})
        .then((count) => {
            res.send(
                `<p>Phonebook has info on ${count} people</p><p>${date}</p>`
            );
        })
        .catch((error) => next(error));
});

app.get("/api/persons", (req, res, next) => {
    Person.find({})
        .then((persons) => res.json(persons))
        .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    Person.findById(id)
        .then((person) => res.json(person))
        .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(204).end();
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
    const name = req.body.name;
    const number = req.body.number;

    const person = new Person({
        name: name,
        number: number,
    });

    person
        .save()
        .then((savedPerson) => {
            res.json(savedPerson);
        })
        .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body;
    const person = { name: body.name, number: body.number };

    Person.findByIdAndUpdate(request.params.id, person, {
        new: true,
        runValidators: true,
        context: "query",
    })
        .then((updatedPerson) => response.json(updatedPerson))
        .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError")
        return response.status(400).send({ error: "malformatted id" });
    else if (error.name === "ValidationError")
        return response.status(400).json({ error: error.message });
    next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log("Server running on port " + PORT);
