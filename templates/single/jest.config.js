<% if (ts) { -%>
/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
<% } -%>
const config = {
<% if (ts) { -%>
  globals: {
    'vue-jest': {
      tsConfig: './tsconfig.json',
    },
    'ts-jest': {
      tsconfig: {
        allowJs: true,
      },
    },
  },
<% } -%>
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  moduleFileExtensions: [
<% if (ts) { -%>
    'ts',
<% } -%>
    'js',
    'vue',
    'json',
  ],
  transform: {
<% if (ts) { -%>
    '^.+\\.(t|j)s$': 'ts-jest',
<% } else { -%>
    '\\.js$': 'babel-jest',
<% } -%>
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.vue',
    '<rootDir>/src/**/*.js',
<% if (ts) { -%>
    '<rootDir>/src/**/*.ts',
<% } -%>
  ],
  coveragePathIgnorePatterns: [
    'node_modules',
  ],
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
};

module.exports = config;
