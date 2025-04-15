/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';



import { Provider } from 'react-redux';
import { weatherStore } from './src/Store/WeatherStore';
import { HomePage } from './src/components/HomePage';
import {ThemeProvider} from './src/styles/theme/context/ThemeContext'

import { NetworkProvider } from './src/hooks/NetworkContext';



function App(): React.JSX.Element {




  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */

  return (



    <NetworkProvider>
      <Provider store={weatherStore} >
        <ThemeProvider>
          <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.appContainer}>
              <HomePage />
            </View>
          </SafeAreaView>
        </ThemeProvider>
      </Provider>
    </NetworkProvider>
  );
}

const styles = StyleSheet.create({

  safeAreaContainer: {
    flex: 1
  },
  appContainer: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


export default App;
