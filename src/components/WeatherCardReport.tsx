
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { WeatherResponse } from '../models/WeatherModel';
import { getWeatherCardColor, getWeatherIcon } from '../helpers/weatherHelper';
import { useTheme } from "../styles/theme/context/ThemeContext";

type Props = {
    weather: WeatherResponse;
  };

  /**
   * Reusable Weather Report Card
   * @param param0 weather response
   * @returns 
   */
export const WeatherCardReport: React.FC<Props> = ( {weather}) => {
  const { theme, themedStyles } = useTheme();
      const isDarkMode = theme === 'dark';
  const weatherMain = weather?.weather?.[0]?.main?.toLowerCase();
  const iconName = getWeatherIcon(weatherMain);
  const backgroundColor = getWeatherCardColor(weatherMain);



  const styles = StyleSheet.create({
    card: {
      margin: 20,
      padding: 25,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 10,
      alignItems: 'center',
    },
    cityText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? "white" : "black",
      marginBottom: 10,
    },
    weatherImage: {
      marginBottom: 10,
    },
    weatherMainText: {
      fontSize: 22,
      fontWeight: "600",
      color: isDarkMode ? "white" : "black",
      marginBottom: 5,
    },
    tempText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: isDarkMode ? "white" : "black",
    },
  });


  return (
    <View style={[themedStyles.card, { backgroundColor }]}>
      <Text style={themedStyles.cityText}>{weather.name}</Text>

      <MaterialCommunityIcons
        name={iconName}
        size={150}
        color="#fff"
        style={themedStyles.weatherImage}
      />

      <Text style={themedStyles.weatherMainText}>
        {weather?.weather?.[0]?.main}
      </Text>

      <Text style={themedStyles.tempText}>
        {weather.main?.temp ? `${Math.round(weather.main.temp - 273.15)}°C` : ""}
      </Text>
    </View>
  );
};


  
