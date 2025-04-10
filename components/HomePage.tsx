
import { AppDispatch, weatherStore } from '../Store/WeatherStore';
import { RootState } from '../Store/WeatherStore';
import { fetchWeatherData } from '../redux/FetchWeather';
import React, { useEffect, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { ResponseState } from '../states/WeatherState';



export const HomePage = () => {
    const weatherDispatch = useDispatch<AppDispatch>()

    const { weather, status, error } = useSelector((state: RootState) => state.weatherReducerState)


    useEffect(() => {
        weatherDispatch(fetchWeatherData("raipur"))
    }, [])

    return (
        <View>
            {status == ResponseState.Loading && (
                <Text>{status}</Text>
            )
            }

            {error && (
                <Text>Error fetching: {error}</Text>
            )}
            <Text>Weather Base {weather.base}</Text>
        </View>
    )
}