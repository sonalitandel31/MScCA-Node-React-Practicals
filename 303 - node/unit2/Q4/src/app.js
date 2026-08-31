const greet = (name = "User") => {
    return `Hello, ${name}!`;
};

let name = "Sonali";

console.log(greet(name));