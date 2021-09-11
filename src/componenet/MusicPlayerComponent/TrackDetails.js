import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

const height = Dimensions.get("window").height
const width = Dimensions.get("window").width


export function TrackDetails({ songname, artistname, Playing }) {

    const Navigation = useNavigation()

    return (

        <TouchableOpacity activeOpacity={0.7} onPress={() => {
              
        }}>
            <View style={styles.container}>
                <Text style={styles.songname}>{songname} </Text>
                <Text style={styles.artistname}>{artistname}</Text>
              
              {/* <View >
              <AntDesign name="heart" size={20} style={{ right: 8, position: "absolute", marginTop: 20 }} />
                

              <View/> */}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        marginLeft: 3,
        marginTop: height / 18
    },
    songname: {
        color: "white",
        fontWeight: "bold",
        fontSize: 23,
        textTransform: "capitalize",
        padding: 2
    },
    artistname: {
        color: "gray",
        fontSize: 15,
        padding: 2,
        textTransform: "capitalize"
    }
})
