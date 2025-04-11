
jest.mock('../components/HomePage', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    HomePage: () => React.createElement(Text, { testID: 'home-page' }, 'Mock Home Page')
  };
});

