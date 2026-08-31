const express = require("express");

const app = express();

const users = [
    {
        id: 1,
        name: "Sonali"
    },
    {
        id: 2,
        name: "ABC"
    }
];

app.get("/users", (req, res) => {
    res.status(200).json(users);
});

module.exports = app;