import { Text, View } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "../styles/theme/context/ThemeContext";

export const ErrorPlaceholder: React.FC = () => {
     const { themedStyles } = useTheme();

    return (

        <View style={themedStyles.placeHolderCard}>
            <Text style={themedStyles.placeHolderTitle}>City name not found</Text>
            <MaterialCommunityIcons
                name="sync-alert"
                size={150}
                color="#fff"
            />

            <Text style={themedStyles.placeHolderDescription}>Enter city again</Text>
        </View>
    )
}