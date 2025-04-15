import {
    useEffect,
    useState,
    useRef
} from 'react';

import { fetchWeatherData } from '../features/weather/weatherThunk';
import Ionicons from "react-native-vector-icons/Ionicons";
import {
    useTheme
} from '../styles/theme/context/ThemeContext';
import {
    ImageBackground,
    Switch
} from 'react-native';


import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ResponseState } from '../features/weather/weatherState';
import { WeatherCardReport } from '../components/WeatherCardReport';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LAST_SEARCHED_CITY } from '../const/StorageConstants';
import { ErrorPlaceholder } from '../components/ErrorPlaceholder';
import { WeatherPlaceHolder } from '../components/WeatherPlaceholder';
import { useNetwork } from '../hooks/NetworkContext';
import { NetworkUnAvailable } from '../components/NetworkUnAvailable';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from 'src/redux/store';


export const HomePage = () => {
    const { theme, toggleTheme, themedStyles } = useTheme();
    const isDarkMode = theme === 'dark';

    const weatherDispatch = useAppDispatch();
    const { weather, status, error } = useAppSelector((state: RootState) => state.weather);
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


    return (

        <ImageBackground source={backgroundImage} style={themedStyles.flex1}>
            <View style={themedStyles.flex1}>
                <View style={themedStyles.topBar}>
                    <Text style={themedStyles.homePageTitle}>Weather</Text>
                    <View style={themedStyles.topBarRightControls}>
                        <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
                            <Ionicons name="search-outline" size={30} style={themedStyles.searchIcon} />
                        </TouchableOpacity>
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleTheme}
                            thumbColor={isDarkMode ? "#facc15" : "#0f172a"}
                            trackColor={{ false: "#ccc", true: "#334155" }}
                        />
                    </View>
                </View>


                <View style={themedStyles.flex1}>
                    {searchVisible && (
                        <View style={themedStyles.searchInput}>
                            <TextInput
                                placeholder="Enter city"
                                value={searchInput}
                                onChangeText={(textChange) => { onInputChange(textChange) }}
                                style={themedStyles.inputBox}
                            />
                        </View>
                    )}
                    {!isConnected &&
                        <View style={themedStyles.weatherReportContainer}>
                            <NetworkUnAvailable />
                        </View>
                    }
                    {isConnected &&
                        <View style={themedStyles.weatherReportContainer}>


                            {status === ResponseState.Loading ? (
                                <ActivityIndicator size="large" color="#007BFF" />
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