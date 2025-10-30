// import { createDefaultPreset } from "ts-jest";

// const tsJestTransformCfg = createDefaultPreset().transform;

// /** @type {import("jest").Config} **/
// export const testEnvironment = "node";
// export const transform = {
//   ...tsJestTransformCfg,
// };

/** @type {import('jest').Config} */
export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const roots = ['<rootDir>/tests'];
export const moduleFileExtensions = ['ts', 'js', 'json'];
export const testMatch = ['**/?(*.)+(spec|test).[tj]s'];
export const moduleNameMapper = {
  '^@src/(.*)$': '<rootDir>/src/$1'
};
export const globals = {
  'ts-jest': {
    tsconfig: 'tsconfig.test.json'
  }
};
export const clearMocks = true;
export const verbose = true;

// /** @type {import('jest').Config} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   roots: ['<rootDir>/tests'],
//   moduleFileExtensions: ['ts', 'js', 'json'],
//   testMatch: ['**/?(*.)+(spec|test).[tj]s'],
//   moduleNameMapper: {
//     '^@src/(.*)$': '<rootDir>/src/$1'
//   },
//   globals: {
//     'ts-jest': {
//       tsconfig: 'tsconfig.test.json'
//     }
//   },
//   clearMocks: true,
//   verbose: true
// };

