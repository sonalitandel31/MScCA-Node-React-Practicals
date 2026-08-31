const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");

describe("GET /users", function () {

    it("should return status 200", async function () {

        const response = await request(app)
            .get("/users");

        expect(response.status).to.equal(200);

    });

    it("should return correct user data", async function () {

        const response = await request(app)
            .get("/users");

        expect(response.body).to.deep.equal([
            {
                id: 1,
                name: "Sonali"
            },
            {
                id: 2,
                name: "ABC"
            }
        ]);

    });

});