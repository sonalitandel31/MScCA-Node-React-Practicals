const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const file = "users.json";

function getUsers() {
    try {
        return JSON.parse(fs.readFileSync(file));
    } catch {
        return [];
    }
}

function saveUsers(users) {
    fs.writeFileSync(file, JSON.stringify(users, null, 2));
}

// GET
app.get("/users", (req, res) => {
    res.json(getUsers());
});

// POST
app.post("/users", (req, res) => {
    const users = getUsers();
    users.push(req.body);
    saveUsers(users);
    res.json({
        message: "User Added"
    });

});

// PUT
app.put("/users/:id", (req, res) => {
    const users = getUsers();
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id == id);
    if (index != -1) {
        users[index] = req.body;
        saveUsers(users);
        res.json({
            message: "User Updated"
        });
    }
});

// DELETE
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let users = getUsers();
    users = users.filter(u => u.id != id);
    saveUsers(users);
    res.json({
        message: "User Deleted"
    });
});

app.listen(3000, () => {
    console.log("Server Running");
});