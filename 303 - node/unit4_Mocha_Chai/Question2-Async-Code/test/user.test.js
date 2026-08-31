const { expect } = require("chai");
const { getUser } = require("../user");

describe("Asynchronous getUser Function", function () {

    it("should return the expected user information", async function () {

        const user = await getUser();

        expect(user).to.be.an("object");
        expect(user.id).to.equal(101);
        expect(user.name).to.equal("Sonali");

    });

});