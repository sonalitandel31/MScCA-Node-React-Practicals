"use strict";

var greet = function greet() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "User";
  return "Hello, ".concat(name, "!");
};
var name = "Sonali";
console.log(greet(name));