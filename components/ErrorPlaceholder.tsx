import { StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const ErrorPlaceholder = () => {

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


const styles = StyleSheet.create({

    card: {
        margin: 20,
        padding: 25,
        borderRadius: 20,
        alignItems: 'center',
      },

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "pink",
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