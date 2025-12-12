module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^react-native-config$': '<rootDir>/__mocks__/react-native-config.js',
    '^@op-engineering/op-sqlite$': '<rootDir>/__mocks__/op-sqlite.js',
    '^react-native-quick-crypto$': '<rootDir>/__mocks__/react-native-quick-crypto.js',
    '^react-native-localize$': '<rootDir>/__mocks__/react-native-localize.js',
  },
};
