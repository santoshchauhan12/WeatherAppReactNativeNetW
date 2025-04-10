

import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { WeatherState } from '../states/WeatherState';
import { WeatherResponse } from '../models/WeatherModel';
import { getWeatherCardColor, getWeatherIcon } from '../helpers/weatherHelper';

type Props = {
    weather: WeatherResponse;
  };

export const WeatherCardReport: React.FC<Props> = ( {weather}) => {
  const weatherMain = weather?.weather?.[0]?.main?.toLowerCase();
  const iconName = getWeatherIcon(weatherMain);
  const backgroundColor = getWeatherCardColor(weatherMain);

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={styles.cityText}>{weather.name}</Text>

      <MaterialCommunityIcons
        name={iconName}
        size={150}
        color="#fff"
        style={styles.weatherImage}
      />

      <Text style={styles.weatherMainText}>
        {weather?.weather?.[0]?.main}
      </Text>

      <Text style={styles.tempText}>
        {weather.main?.temp ? `${Math.round(weather.main.temp - 273.15)}°C` : ""}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      margin: 20,
      padding: 25,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 10, // for Android shadow
      alignItems: 'center',
    },
    cityText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: "#fff",
      marginBottom: 10,
    },
    weatherImage: {
      marginBottom: 10,
    },
    weatherMainText: {
      fontSize: 22,
      fontWeight: "600",
      color: "#fff",
      marginBottom: 5,
    },
    tempText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: "#fff",
    },
  });
  
