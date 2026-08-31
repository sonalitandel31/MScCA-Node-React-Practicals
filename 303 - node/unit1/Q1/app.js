const fs = require("fs");

const file = "users.json";

// Read Users
function readUsers() {
    try {
        const data = fs.readFileSync(file);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Save Users
function saveUsers(users) {
    fs.writeFileSync(file, JSON.stringify(users, null, 2));
}

// Add User
function addUser(id, name) {
    const users = readUsers();

    users.push({
        id,
        name
    });

    saveUsers(users);

    console.log("User Added");
}

// Display Users
function showUsers() {
    const users = readUsers();

    console.log(users);
}

// Delete User
function deleteUser(id) {
    let users = readUsers();

    users = users.filter(user => user.id != id);

    saveUsers(users);

    console.log("User Deleted");
}

addUser(1, "Sonali");
addUser(2, "Maitri");

showUsers();

deleteUser(1);

showUsers();