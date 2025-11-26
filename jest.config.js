module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^react-native-config$': '<rootDir>/__mocks__/react-native-config.js',
    '^@op-engineering/op-sqlite$': '<rootDir>/__mocks__/op-sqlite.js',
  },
};
