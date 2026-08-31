const { expect } = require("chai");
const calculator = require("../calculator");

describe("Calculator Functions", function () {

    it("should add two numbers", function () {
        expect(calculator.add(10, 5)).to.equal(15);
    });

    it("should subtract two numbers", function () {
        expect(calculator.subtract(10, 5)).to.equal(5);
    });

    it("should multiply two numbers", function () {
        expect(calculator.multiply(10, 5)).to.equal(50);
    });

});