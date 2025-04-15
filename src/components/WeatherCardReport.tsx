
import React from 'react';
import { View, Text } from 'react-native';
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
  const { themedStyles } = useTheme();
  const weatherMain = weather?.weather?.[0]?.main?.toLowerCase();
  const iconName = getWeatherIcon(weatherMain);
  const backgroundColor = getWeatherCardColor(weatherMain);


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


  
