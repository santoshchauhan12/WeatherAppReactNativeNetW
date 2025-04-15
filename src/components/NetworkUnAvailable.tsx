import { Text, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "../styles/theme/context/ThemeContext";


export const NetworkUnAvailable = () => {

    const { themedStyles } = useTheme();
   
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