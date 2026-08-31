import express from "express";

const app = express();
const PORT = 3000;

const users = [
    { id: 1, name: "Sonali", email: "sonali@example.com", age: 22 },
    { id: 2, name: "abc", email: "abc@example.com", age: 24 },
    { id: 3, name: "xyz", email: "xyz@example.com", age: 21 }
];

app.set("view engine", "ejs");

app.get("/dashboard", (req, res) => {
    res.render("dashboard", { users });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});