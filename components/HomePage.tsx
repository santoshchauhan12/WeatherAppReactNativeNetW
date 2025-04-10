
import { AppDispatch, weatherStore } from '../Store/WeatherStore';
import { RootState } from '../Store/WeatherStore';
import { fetchWeatherData } from '../redux/FetchWeather';
import React, { useEffect, Dispatch, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


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



export const HomePage = () => {
    const weatherDispatch = useDispatch<AppDispatch>()

    const { weather, status, error } = useSelector((state: RootState) => state.weatherReducerState)


    const [searchVisible, setSearchVisible] = useState(false);
    const [searchInput, setSearchInput] = useState("")
    const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);


    useEffect(() => {
        weatherDispatch(fetchWeatherData("raipur"))
    }, [])

    function onInputChange(value: string) {

        setSearchInput(value)
    }

    useEffect(() => {

        if (searchTimer.current) {
            clearTimeout(searchTimer.current)
        }

        searchTimer.current = setTimeout(() => {

            if (searchInput != "") {
                weatherDispatch(fetchWeatherData(searchInput))
            }
        }, 2000)

        return () => clearTimeout(searchTimer.current!);
    }, [searchInput])

    const weatherMain = weather?.weather?.[0]?.main?.toLowerCase();


    return (

        <View >
            <View style={styles.topBar}>
                <Text style={styles.title}>Weather</Text>
                <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
                    <Ionicons name="search-outline" size={50} color="#000" />
                </TouchableOpacity>
            </View>

            <View>
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
                {status === ResponseState.Loading ? (
                    <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 50 }} />
                ) : error ? (
                    <Text style={styles.errorText}>Error: {error}</Text>
                ) : (
                    <>
                        {weather && <WeatherCardReport weather={weather} />}

                    </>
                )}
            </View>
        </View >
    )

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "black"
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        justifyContent: "space-around",
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
    weatherImage: {
        width: 150,
        height: 150,
        alignSelf: "center",
        marginVertical: 20,
    },
    tempText: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
    },
    cityText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "500",
        marginTop: 20,
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: 40,
    },

})