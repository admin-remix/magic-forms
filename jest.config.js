module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  testEnvironment: 'setup-polly-jest/jest-environment-jsdom',
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 98,
      functions: 98,
      lines: 98,
    },
  },
};