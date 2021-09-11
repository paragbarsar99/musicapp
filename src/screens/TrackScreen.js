import React, { useRef, useEffect, useState } from 'react'
import {
    StyleSheet, View, Animated,
    Dimensions,
} from 'react-native'
import backgroundcolor from '../utils/data/backgroundcolor.json'
import { Header, UpperViewContainerofScrollView, ScrollableView } from '../componenet/index'
import { useDispatch, useSelector } from 'react-redux';


const height = Dimensions.get("window").height

export function TrackScreen({ route }) {

    const { id, artwork, title, user, duration, genre } = route.params

    //here i'm making a array of obj,it will going to render by scrollview  
    const data = [{ id, title, user: { name: user }, is_album: false, artwork, duration, genre }]

    //useRef make a class instance just once on first render of component
    const scrollY = useRef(new Animated.Value(0)).current

    //state for fetch data 
    const [Loading, setLoading] = useState(true)

    //instance of dispatch
    const dispatch = useDispatch()

    //get reducer back from rootReducer

    const stickyArray = [0];
    const headingRange = [230, 280];
    const shuffleRange = [40, 80];//pixel 

    const opacityHeading = scrollY.interpolate({
        inputRange: headingRange,
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    const opacityShuffle = scrollY.interpolate({
        inputRange: shuffleRange,
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    let indexvalue = Math.floor(Math.random() * backgroundcolor.backgroundcolor.length)
    let color = backgroundcolor.backgroundcolor[indexvalue]

    return (
        <View style={{ backgroundColor: "black", height: "100%" }}>

            <View style={styles.container}>

                <>
                    {/* this code is for header */}

                    <Header
                        opacityHeading={opacityHeading}
                        opacityShuffler={opacityShuffle}
                        artistname={user}
                        color={color}
                    />


                    {/* View contain image ,playlist name and provider  */}

                    <UpperViewContainerofScrollView
                        cover_image={artwork}
                        artistname={user}
                        color={color}

                    />

                    {/* here's we start scrollview and  */}

                    <ScrollableView
                        scrollY={scrollY}
                        stickyHeaderIndices={stickyArray}
                        opacityShuffle={opacityShuffle}
                        AlbumSong={data}
                        is_Track={true}
                        is_album={false}
                        id={id}
                        title={title}
                        artistname={user}
                        cover_image={artwork}
                    />


                </>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
    },

    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%'
    },
    downloadText: {

        color: 'white'
    }
})
