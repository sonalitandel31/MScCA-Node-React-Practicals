const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("userLogin", (username) => {
    console.log("User :", username);
    console.log("Login Time :", new Date());
});

emitter.emit("userLogin", "Sonali");