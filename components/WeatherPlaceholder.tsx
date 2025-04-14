import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "../hooks/ThemeContext";
import React from 'react';


export const WeatherPlaceHolder = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const styles = StyleSheet.create({

        card: {
            margin: 20,
            padding: 25,
            borderRadius: 20,
            alignItems: 'center',
        },

        title: {
            color: isDarkMode ? "white" : "black",
            alignSelf: "center",
            fontSize: 22,
            fontWeight: "600"
        },

        description: {
            color: isDarkMode ? "white" : "black",
            alignSelf: "center",
            fontSize: 22,
            fontWeight: "600",
            textAlign: "center"
        }
    })


    return (

        <View style={styles.card}>
            <Text style={styles.title}> Current location not found</Text>

            <MaterialCommunityIcons
                name="cloud-search"
                size={150}
                color="#fff"
            />

            <Text style={styles.description}>Search above to get your weather report</Text>
        </View>
    )
}


