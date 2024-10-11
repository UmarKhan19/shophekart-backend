/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    preset: "ts-jest",
    verbose: true,
    forceExit: true,
    resetModules: false,
    testEnvironment: "node",
    testPathIgnorePatterns: ["./node_modules/", "./tests/", "./dist/"],
    moduleFileExtensions: ["js", "json", "ts", "tsx"],
    clearMocks: true,
    testEnvironment: "node",
    testMatch: ["**/*.test.ts", "**/*.test.js"],
    transform: {
        "^.+.ts?$": ["ts-jest", { tsconfig: "tsconfig.json" }]
    }
}

