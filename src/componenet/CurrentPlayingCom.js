import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Touchable } from 'react-native'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useSelector } from 'react-redux'

export function CurrentPlayingCom() {

    const { Playing } = useSelector(item => item)

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
       
            }}>
            <Text style={styles.Now}>Now Playing</Text>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth:2,
        borderColor:"red",
        height: 100,
        width: 100,

    },
    image:{
      borderRadius:20,
      width:50,
      height:50
    }, 
    Now: {
        fontWeight: "bold",
        fontSize: 20,

    }
})
