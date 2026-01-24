module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/tests/unit/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  collectCoverageFrom: [
    'src/services/**/*.ts',
    '!src/tests/**',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Clear mocks between tests
  clearMocks: true,
  testTimeout: 10000,
  // Force setup to run first
  setupFiles: ['<rootDir>/src/tests/setup.ts'],
};