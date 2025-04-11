import { StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "../hooks/ThemeContext";


export const ErrorPlaceholder = () => {
    const { theme, toggleTheme } = useTheme();
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
            fontWeight: "600"
        }
    })

    return (

        <View style={styles.card}>
            <Text style={styles.title}>City name not found</Text>



            <MaterialCommunityIcons
                name="sync-alert"
                size={150}
                color="#fff"
            />

            <Text style={styles.description}>Enter city again</Text>
        </View>
    )
}