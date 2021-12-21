module.exports = {
  verbose: false,
  testMatch: [
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
  },
}