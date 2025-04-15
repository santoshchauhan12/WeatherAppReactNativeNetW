import { Text, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "../styles/theme/context/ThemeContext";


export const WeatherPlaceHolder = () => {
   
    const { themedStyles } = useTheme();

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


