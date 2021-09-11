import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Slider from '@react-native-community/slider'

export function SliderComponent({ slidingValue, slidingStarted, slidingCompleted, position, duration }) {
   
   
    return (
        <View style={styles.controlsContainer}>
            <Slider
                style={styles.progressBar}
                minimumValue={0}
                maximumValue={1}
                value={slidingValue}
                minimumTrackTintColor="green"
                maximumTrackTintColor="white"
                onSlidingStart={slidingStarted}
                onSlidingComplete={slidingCompleted}
                thumbTintColor="green"
            />
            <View style={styles.tracktimer}>
                <Text style={styles.begin} allowFontScaling={false}>{(position/60).toFixed(2)}</Text>
                <Text style={styles.end} allowFontScaling={false}>{(duration/60).toFixed(2)}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    progressBar: {
        height: 20,
        color: "white",

    },
    controlsContainer: {
        justifyContent: 'flex-start',
        flex: 0.45,
        marginTop: 25

    },
    tracktimer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    begin: {
        left: 10,
        position: "absolute",
        color: "gray",
        fontSize: 15
    },
    end: {
        right: 10,
        position: "absolute",
        color: "gray",
        fontSize: 15
    }
})
