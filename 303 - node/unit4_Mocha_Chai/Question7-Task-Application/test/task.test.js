const { expect } = require("chai");
const request = require("supertest");

const { app, clearTasks } = require("../app");

describe("Task Application", function () {

    beforeEach(function () {
        clearTasks();
    });

    afterEach(function () {
        clearTasks();
    });

    it("should create a new task", async function () {

        const response = await request(app)
            .post("/tasks")
            .send({
                title: "Complete practical",
                completed: false
            });

        expect(response.status).to.equal(201);

        expect(response.body).to.include({
            id: 1,
            title: "Complete practical",
            completed: false
        });

    });

    it("should retrieve all tasks", async function () {

        await request(app)
            .post("/tasks")
            .send({
                title: "Complete practical",
                completed: false
            });

        const response = await request(app)
            .get("/tasks");

        expect(response.status).to.equal(200);

        expect(response.body).to.be.an("array");

        expect(response.body).to.have.lengthOf(1);

        expect(response.body[0].title)
            .to.equal("Complete practical");

    });

    it("should reject a task without a title", async function () {

        const response = await request(app)
            .post("/tasks")
            .send({
                completed: false
            });

        expect(response.status).to.equal(400);

        expect(response.body.message)
            .to.equal("Title is required");

    });

    it("should return an empty array after setup reset", async function () {

        const response = await request(app)
            .get("/tasks");

        expect(response.status).to.equal(200);

        expect(response.body).to.deep.equal([]);

    });

});