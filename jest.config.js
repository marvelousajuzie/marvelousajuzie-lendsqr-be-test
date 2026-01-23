module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  

  moduleNameMapper: {
    '^uuid$': '<rootDir>/node_modules/uuid/dist/index.js',
  },
  
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  

  transformIgnorePatterns: [
    'node_modules/(?!uuid)',
  ],
  
  collectCoverageFrom: [
    'src/services/**/*.ts',
    '!src/**/*.d.ts',
    '!src/tests/**',
  ],
  
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40
    }
  },
  
  testTimeout: 30000,
};