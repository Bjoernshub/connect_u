module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      },      
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
      },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native'
      + '|@react-native'
      + '|react-navigation-tabs'
      + '|react-native-splash-screen'
      + '|react-native-screens'
      + '|react-native-reanimated'
      + ')/)',
      'node_modules/(?!(react-native|expo-constants|@react-navigation|@expo/vector-icons)/)',
    ],
  };
  