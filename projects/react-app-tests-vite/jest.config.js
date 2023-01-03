module.exports = {
  roots: ["./src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  testRegex: "^.+\\.(test|spec)\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};