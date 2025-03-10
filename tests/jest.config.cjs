/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  setupFilesAfterEnv: ['./jest.setup.js'], // Use our custom setup file
  maxWorkers: 1, // Run tests sequentially to avoid worker issues
  forceExit: true, // Force Jest to exit after tests complete
  testTimeout: 30000, // Increase timeout for tests
  detectOpenHandles: true, // Help identify open handles
};
