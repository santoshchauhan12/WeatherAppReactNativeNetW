/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, weatherStore } from './Store/WeatherStore';
import { RootState } from './Store/WeatherStore';
import { fetchWeatherData } from './redux/FetchWeatherSlice';
import { HomePage } from './components/HomePage';
import { ThemeProvider } from './hooks/ThemeContext';



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';



  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };




  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  const safePadding = '5%';

  return (

    <Provider store={weatherStore} >
      <ThemeProvider>
        <View style={styles.appContainer}>
            <HomePage />
        </View>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({

  appContainer: {
    flex: 1,
    backgroundColor: "green"
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
