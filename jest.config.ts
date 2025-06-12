/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
  },

  setupFiles: ['<rootDir>/jest.setup.ts'],  
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  transform: {},
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
};

export default config;
