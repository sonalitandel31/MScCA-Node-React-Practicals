const { expect } = require("chai");
const sinon = require("sinon");

const emailService = require("../emailService");
const userService = require("../userService");

describe("UserService", function () {

    let emailStub;

    beforeEach(function () {

        emailStub = sinon
            .stub(emailService, "sendEmail")
            .resolves(true);

    });

    afterEach(function () {

        emailStub.restore();

    });

    it("should call email service when user registers", async function () {

        const user = {
            id: 1,
            name: "Sonali",
            email: "sonali@example.com"
        };

        await userService.registerUser(user);

        expect(emailStub.calledOnce).to.equal(true);

        expect(
            emailStub.calledWith(
                "sonali@example.com",
                "Welcome",
                "Welcome Sonali"
            )
        ).to.equal(true);

    });

});