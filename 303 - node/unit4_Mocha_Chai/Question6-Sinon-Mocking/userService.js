const emailService = require("./emailService");

async function registerUser(user) {

    const result = await emailService.sendEmail(
        user.email,
        "Welcome",
        `Welcome ${user.name}`
    );

    return {
        id: user.id,
        name: user.name,
        emailSent: result
    };
}

module.exports = {
    registerUser
};