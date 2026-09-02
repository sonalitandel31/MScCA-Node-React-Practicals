module.exports = {
    testEnvironment: "jsdom",

    transform: {
        "^.+\\.[jt]sx?$": "babel-jest",
    },

    setupFilesAfterEnv: [
        "<rootDir>/src/setupTests.js",
    ],

    moduleFileExtensions: [
        "js",
        "jsx",
        "json",
    ],

    testMatch: [
        "<rootDir>/src/tests/**/*.test.js",
        "<rootDir>/src/tests/**/*.test.jsx",
    ],
};