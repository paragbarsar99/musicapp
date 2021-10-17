import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'

const {height,width }= Dimensions.get("window")


export function TrackDetails({ songname, artistname, Playing }) {


    return (

        <TouchableOpacity activeOpacity={0.7} onPress={() => {

        }}>
            <View style={styles.container}>
                <Text style={styles.songname} numberOfLines={2}>{songname} </Text>
                <Text style={styles.artistname}>{artistname}</Text>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 3,
        marginTop: height / 18,
        left: 2,
        alignItems: "flex-start",
        height:50,
        width:width,
        justifyContent:"center"
    },
    songname: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
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
