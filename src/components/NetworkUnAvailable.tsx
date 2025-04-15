import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "../styles/theme/context/ThemeContext";


export const NetworkUnAvailable = () => {

    const { theme, themedStyles } = useTheme();
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

        <View style={themedStyles.placeHolderCard}>

            <MaterialCommunityIcons
                name="sync-alert"
                size={150}
                color="#fff"
            />

            <Text style={themedStyles.placeHolderDescription}>Turn-ON your Internet.</Text>
        </View>
    )
}