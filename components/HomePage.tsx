
import { AppDispatch, weatherStore } from '../Store/WeatherStore';
import { RootState } from '../Store/WeatherStore';
import { fetchWeatherData } from '../redux/FetchWeatherSlice';
import React, { useEffect, Dispatch, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/ThemeContext';
import { Switch } from 'react-native';


import {
    ActivityIndicator,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { ResponseState } from '../states/WeatherState';
import { getGradientForWeatherBackground, getWeatherIcon } from '../helpers/weatherHelper';
import { WeatherCardReport } from './WeatherCardReport';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LAST_SEARCHED_CITY } from '../const/StorageConstants';
import { ErrorPlaceholder } from './ErrorPlaceholder';
import { WeatherPlaceHolder } from './WeatherPlaceholder';



export const HomePage = () => {
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    const weatherDispatch = useDispatch<AppDispatch>()

    const { weather, status, error } = useSelector((state: RootState) => state.weatherReducerState)


    const [searchVisible, setSearchVisible] = useState(false);
    const [searchInput, setSearchInput] = useState("")
    const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [lastSearchedCity, setLastSearchedCity] = useState('');

    function onInputChange(value: string) {

        setSearchInput(value)
    }

    const saveSearchedCity = async (searchCity: string) => {
        await AsyncStorage.setItem(LAST_SEARCHED_CITY, searchCity);
    }

    useEffect(() => {

        if (searchTimer.current) {
            clearTimeout(searchTimer.current)
        }

        searchTimer.current = setTimeout(() => {

            if (searchInput != "") {
                weatherDispatch(fetchWeatherData(searchInput))
                saveSearchedCity(searchInput)
            }
        }, 2000)

        return () => clearTimeout(searchTimer.current!);
    }, [searchInput])

    useEffect(() => {
        const getLastSearchedCity = async () => {
            const city = await AsyncStorage.getItem(LAST_SEARCHED_CITY);
            if (city) {
                setLastSearchedCity(city);
                weatherDispatch(fetchWeatherData(city));
            }
        };
        getLastSearchedCity();
    }, []);

    const weatherMain = weather?.weather?.[0]?.main?.toLowerCase();

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: isDarkMode ? "#0f172a" : "#f3f4f6",
        },

        cardContainer: {
            flex: 1,
        },
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "pink"
        },

        topBar: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "blue"
        },
        title: {
            fontSize: 26,
            fontWeight: "600",
            color: "black",
            backgroundColor: "blue"
        },

        searchBox: {
            marginTop: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            elevation: 2,
        },
        input: {
            height: 40,
            fontSize: 16,
        },
    })


    return (

        <View style={styles.mainContainer}>
            <View style={styles.topBar}>
                <Text style={styles.title}>Weather</Text>
                <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
                    <Ionicons name="search-outline" size={50} color="#000" />
                </TouchableOpacity>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleTheme}
                    thumbColor={isDarkMode ? "#facc15" : "#0f172a"}
                    trackColor={{ false: "#ccc", true: "#334155" }}
                />
            </View>


            <View style={styles.cardContainer}>
                {searchVisible && (
                    <View style={styles.searchBox}>
                        <TextInput
                            placeholder="Enter city"
                            value={searchInput}
                            onChangeText={(textChange) => { onInputChange(textChange) }}
                            style={styles.input}
                        />
                    </View>
                )}
                <View style={styles.container}>


                    {status === ResponseState.Loading ? (
                        <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 50 }} />
                    ) : error ? (
                        <ErrorPlaceholder />

                    ) : lastSearchedCity == "" && !weather ? (

                        <WeatherPlaceHolder />

                    ) : (
                        <>
                            {weather && <WeatherCardReport weather={weather} />}

                        </>
                    )}
                </View>

            </View>
        </View >
    )
}