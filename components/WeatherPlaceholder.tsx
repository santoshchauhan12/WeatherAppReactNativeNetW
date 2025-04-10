import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



export const WeatherPlaceHolder = () => {

    return (

        <View style={styles.card}>
            <Text style={styles.title}>Current location not found</Text>

             <MaterialCommunityIcons
                    name= "cloud-search" 
                    size={150}
                    color="#fff"
                  />

            <Text style={styles.description}>Search above to get your weather report</Text>
        </View>
    )
}












const styles = StyleSheet.create({

    card: {
        margin: 20,
        padding: 25,
        borderRadius: 20,
        alignItems: 'center',
      },
    container: {
        alignSelf: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "blue",
        flexDirection: "column"
    },

    title: {
        color: "Black",
        alignSelf: "center"
    },

    description: {
        color: "Black",
        alignSelf: "center"
    }
})