import express from "express";

const app = express();
const PORT = 3000;

const users = [
    {
        id: 1,
        name: "Sonali",
        email: "sonali@example.com",
        age: 22
    },
    {
        id: 2,
        name: "abc",
        email: "abc@example.com",
        age: 24
    },
    {
        id: 3,
        name: "xyz",
        email: "xyz@example.com",
        age: 21
    }
];

app.set("view engine", "ejs");

app.get("/api/users", (req, res) => {
    try {
        if (!Array.isArray(users)) {
            return res.status(500).json({
                error: "User data is not available"
            });
        }

        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

app.get("/dashboard", async (req, res) => {
    try {
        const response = await fetch(
            `http://localhost:${PORT}/api/users`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid user data");
        }

        res.render("dashboard", { users: data });

    } catch (error) {
        res.status(500).send(`
            <h1>Error</h1>
            <p>${error.message}</p>
        `);
    }
});

app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});