/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  View,
} from 'react-native';



import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { HomePage } from './src/screens/HomePage'
import {ThemeProvider, useTheme} from './src/styles/theme/context/ThemeContext'

import { NetworkProvider } from './src/hooks/NetworkContext';



function App(): React.JSX.Element {

  const { themedStyles } = useTheme();

  return (

    <NetworkProvider>
      <Provider store={store} >
        <ThemeProvider>
          <SafeAreaView style={themedStyles.flex1}>
            <View style={themedStyles.flex1}>
              <HomePage />
            </View>
          </SafeAreaView>
        </ThemeProvider>
      </Provider>
    </NetworkProvider>
  );
}


export default App;
