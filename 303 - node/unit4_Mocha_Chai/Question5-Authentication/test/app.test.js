const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");

describe("GET /profile Authentication", function () {

    it("should return 200 with a valid token", async function () {

        const response = await request(app)
            .get("/profile")
            .set("Authorization", "Bearer secret123");

        expect(response.status).to.equal(200);

        expect(response.body).to.deep.equal({
            id: 101,
            name: "Sonali",
            email: "sonali@example.com"
        });

    });

    it("should return 401 when token is missing", async function () {

        const response = await request(app)
            .get("/profile");

        expect(response.status).to.equal(401);

    });

    it("should return 401 with an invalid token", async function () {

        const response = await request(app)
            .get("/profile")
            .set("Authorization", "Bearer wrongtoken");

        expect(response.status).to.equal(401);

    });

});