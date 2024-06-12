module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/generatedApi.ts',
    '!<rootDir>/src/**/*.stories.{ts,tsx}',
    '!<rootDir>/src/**/index.{ts,tsx}',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  moduleNameMapper: {
    '\\.css$': '<rootDir>/src/shared/testUtils/emptyMock.js',
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
};
