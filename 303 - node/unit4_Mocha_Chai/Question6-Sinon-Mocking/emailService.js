async function sendEmail(email, subject, message) {

    console.log(`Email sent to ${email}`);

    return true;
}

module.exports = {
    sendEmail
};