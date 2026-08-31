import express from "express";

const app = express();
const PORT = 3000;

app.get("/user", (req, res) => {
    const { name, age } = req.query;
    const userAge = Number(age);

    if (!name || !age) {
        return res.status(400).json({
            error: "Name and age are required"
        });
    }

    if (userAge <= 18 || Number.isNaN(userAge)) {
        return res.status(400).json({
            error: "Age must be greater than 18"
        });
    }

    res.json({
        message: `Welcome ${name}!`,
        age: userAge
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});