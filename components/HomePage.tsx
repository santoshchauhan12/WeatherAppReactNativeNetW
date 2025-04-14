import { AppDispatch } from '../Store/WeatherStore';
import { RootState } from '../Store/WeatherStore';
import { fetchWeatherData } from '../redux/FetchWeatherSlice';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from '../hooks/ThemeContext';
import { ImageBackground, Switch } from 'react-native';


import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ResponseState } from '../states/WeatherState';
import { WeatherCardReport } from './WeatherCardReport';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LAST_SEARCHED_CITY } from '../const/StorageConstants';
import { ErrorPlaceholder } from './ErrorPlaceholder';
import { WeatherPlaceHolder } from './WeatherPlaceholder';
import { useNetwork } from '../hooks/NetworkContext';
import { NetworkUnAvailable } from './NetworkUnAvailable';



export const HomePage = () => {
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    const weatherDispatch = useDispatch<AppDispatch>()
    const { weather, status, error } = useSelector((state: RootState) => state.weatherReducerState)
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchInput, setSearchInput] = useState("")
    const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [lastSearchedCity, setLastSearchedCity] = useState('');
    const { isConnected } = useNetwork();

    const backgroundImage = isDarkMode
        ? require('../assets/dark_mode_bg.jpg')
        : require('../assets/light_mode_bg.jpg');


    function onInputChange(value: string) {
        setSearchInput(value)
    }

    /**
     * Save searched city to storage to persist even after app closing
     * @param searchCity 
     */
    const saveSearchedCity = async (searchCity: string) => {
        await AsyncStorage.setItem(LAST_SEARCHED_CITY, searchCity);
    }

    /**
     * debounce for calling the api based on search
     */
    useEffect(() => {

        if (searchTimer.current) {
            clearTimeout(searchTimer.current)
        }

        searchTimer.current = setTimeout(() => {

            if (searchInput != "") {
                weatherDispatch(fetchWeatherData(searchInput))
                saveSearchedCity(searchInput)
            }
        }, 1500)

        return () => clearTimeout(searchTimer.current!);
    }, [searchInput])

    /**
     * Fetch last city search from async storage
     */
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

    /**
     * Trigger network call on network connected only
     */

    useEffect(() => {
        if (isConnected) {
            weatherDispatch(fetchWeatherData(lastSearchedCity));
        }
      }, [isConnected]);





    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1
        },

        cardContainer: {
            flex: 1,
        },
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },

        background: {
            flex: 1,
            resizeMode: 'cover',
        },

        topBar: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: isDarkMode ? "#0f172a" : "#f3f4f6",
        },
        title: {
            fontSize: 26,
            fontWeight: "600",
            color: isDarkMode ? "white" : "black",
            backgroundColor: isDarkMode ? "#0f172a" : "#f3f4f6",
        },

        searchBox: {
            marginTop: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            elevation: 2,
        },

        searchIcon: {
            color: isDarkMode ? "white" : "black"
        },

        rightControls: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },

        input: {
            height: 40,
            fontSize: 16,
        },
    })


    return (

        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.mainContainer}>
                <View style={styles.topBar}>
                    <Text style={styles.title}>Weather</Text>
                    <View style={styles.rightControls}>
                        <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
                            <Ionicons name="search-outline" size={30} style={styles.searchIcon} />
                        </TouchableOpacity>
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleTheme}
                            thumbColor={isDarkMode ? "#facc15" : "#0f172a"}
                            trackColor={{ false: "#ccc", true: "#334155" }}
                        />
                    </View>
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
                    {!isConnected && <NetworkUnAvailable />}
                    {isConnected &&
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
                    }

                </View>
            </View >
        </ImageBackground>
    )
}