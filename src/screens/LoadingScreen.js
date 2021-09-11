import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { LinearGradientColor } from '../componenet'
import { InitialValueOfSetupPlayerAction } from '../Actions/FetchItemAction'
import TrackPlayer from 'react-native-track-player'
export function LoadingScreen() {

    //instance of redux dispatch hook
    const dispatch = useDispatch();

    useEffect(() => {
        // 1. dispatch a action for get the current state of trackplayer
        TrackPlayer.getState().then(Res => {
            dispatch(InitialValueOfSetupPlayerAction(Res))
        })
    }, [])

    return (
        <View>
         <StatusBar backgroundColor="black"/>
            <Image source={require('../assets/images/musicbackground.png')} style={styles.backImage} />
        </View>
    )
}


const styles = StyleSheet.create({
    backImage: {
        height: "100%",
        width: "100%"
    }
})
