const { expect } = require("chai");
const task = require("../task");

describe("Task Application - Setup and Teardown", function () {

    before(function () {
        console.log("Initial setup");
    });

    beforeEach(function () {
        task.clearTasks();

        task.addTask({
            id: 1,
            title: "Complete assignment",
            completed: false
        });
    });

    afterEach(function () {
        task.clearTasks();
    });

    after(function () {
        console.log("Final cleanup");
    });

    it("should create test data before each test", function () {

        const tasks = task.getTasks();

        expect(tasks).to.have.lengthOf(1);
        expect(tasks[0].title).to.equal("Complete assignment");

    });

    it("should contain a pending task", function () {

        const tasks = task.getTasks();

        expect(tasks[0].completed).to.equal(false);

    });

});