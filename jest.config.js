module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 98,
      functions: 98,
      lines: 98,
    },
  },
};