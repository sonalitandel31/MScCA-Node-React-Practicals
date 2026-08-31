const express = require("express");

const app = express();

function authenticate(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    const token = authHeader.replace("Bearer ", "");

    if (token !== "secret123") {
        return res.status(401).json({
            message: "Invalid token"
        });
    }

    next();
}

app.get("/profile", authenticate, (req, res) => {

    res.status(200).json({
        id: 101,
        name: "Sonali",
        email: "sonali@example.com"
    });

});

module.exports = app;