module.exports = {
  verbose: true,
  testEnvironmentOptions: {
    url: 'http://localhost/'
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  globals: {
    ZAFClient: {
      init: () => {}
    }
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/spec'
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/spec/mocks/fileMock.js",
    "\\.(jpg|jpeg|png|gif|webp|svg)ReactComponent$": "<rootDir>/spec/mocks/svgMock.js"
  },
  roots: ['./spec']
}
