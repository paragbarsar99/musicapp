import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import { Header, UpperViewContainerofScrollView, ScrollableView } from '../componenet/index'
import { useDispatch, useSelector } from 'react-redux';
import { ArtistSongById, SearchResultAction } from '../Actions/index'
import { ActivityIndicator } from 'react-native-paper';

const height = Dimensions.get("window").height


export function ArtistSong({ id, artistname, cover_image, color }) {

    //instance of Animated Class 
    const scrollY = useRef(new Animated.Value(0)).current

    //a loading const for make get data fetch
    const [Loading, setLoading] = useState(true)

    //get the dispatch instance 
    const dispatch = useDispatch()

    //get the return value form rootReducer
    const { Artist, Playing } = useSelector(item => item)

    //make a call to get the ArtistSong
    useEffect(() => {
        if (Playing.data.id != id) {
            dispatch(ArtistSongById(id))
            setTimeout(() => {
                setLoading(false)
            }, 2000);
        } else {
            //when Artist already in playing
            setLoading(false)
        }

    }, [id])


    const stickyArray = [0];
    const headingRange = [230, 280];
    const shuffleRange = [40, 80];//pixel 
    const shuffleRangeForLinearColor = [40, 280];//pixel 

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

    const opacityShuffleLinearColor = scrollY.interpolate({
        inputRange: shuffleRangeForLinearColor,
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    return (
        <View style={{ height: "100%", backgroundColor: "black" }}>
            {
                Artist.error === null && !Loading
                    ?
                    <View style={styles.container}>
                        {/* this code is for header */}

                        <Header
                            opacityHeading={opacityHeading}
                            opacityShuffler={opacityShuffle}
                            artistname={artistname}
                        />


                        {/* View contain image ,playlist name and provider  */}

                        <UpperViewContainerofScrollView
                            cover_image={cover_image}
                            artistname={artistname}
                            color={color}
                            opacityShuffler={opacityShuffleLinearColor}

                        />

                        {/* here's we start scrollview and  */}

                        <ScrollableView
                            scrollY={scrollY}
                            stickyHeaderIndices={stickyArray}
                            opacityShuffle={opacityShuffle}
                            AlbumSong={Artist.data}
                            id={id}
                            artistname={artistname}
                            cover_image={cover_image}
                            is_album={false}

                        />
                    </View>

                    :
                    <ActivityIndicator
                        size="large"
                        style={{ marginTop: height / 2, alignSelf: "center" }}
                        color="green" />
            }
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
