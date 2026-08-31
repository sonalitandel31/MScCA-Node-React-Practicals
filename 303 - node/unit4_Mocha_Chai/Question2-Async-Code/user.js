function getUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 101,
                name: "Sonali"
            });
        }, 1000);
    });
}

module.exports = {
    getUser
};