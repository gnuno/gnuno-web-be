module.exports = {
  preset: "@shelf/jest-mongodb",
  testEnvironment: "node",
  roots: ["<rootDir>/__test__/"],
  watchPathIgnorePatterns: ["<rootDir>/node_modules"],
};
