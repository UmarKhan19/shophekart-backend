/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    clearMocks: true,
    testEnvironment: "node",

    transform: {
        "^.+.tsx?$": ["ts-jest", { tsconfig: "__tests__/tsconfig.json" }]
    }
}

