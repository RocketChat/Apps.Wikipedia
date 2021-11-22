module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  testMatch: ['<rootDir>/**/*.spec.ts'],
  automock: true,
  clearMocks: true,
  coverageDirectory: '../coverage',
  verbose: false,
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      lines: 0,
      functions: 0,
    },
  },
  moduleNameMapper: {
    '^@commands/(.*)$': '<rootDir>/commands/$1',
    '^@dictionary/(.*)$': '<rootDir>/dictionary/$1',
    '^@enum/(.*)$': '<rootDir>/enum/$1',
    '^@helper/(.*)$': '<rootDir>/helper/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
  },
}
