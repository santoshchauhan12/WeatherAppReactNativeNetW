import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "../styles/theme/context/ThemeContext";


export const WeatherPlaceHolder = () => {
   
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
            fontWeight: "600",
            textAlign: "center"
        }
    })


    return (

        <View style={themedStyles.placeHolderCard}>
            <Text style={themedStyles.placeHolderTitle}> Current location not found</Text>

            <MaterialCommunityIcons
                name="cloud-search"
                size={150}
                color="#fff"
            />

            <Text style={themedStyles.placeHolderDescription}>Search above to get your weather report</Text>
        </View>
    )
}


