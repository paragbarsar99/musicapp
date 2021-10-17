import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {
    AlbumArt,
    Header,
    SliderComponent,
    Controler,
    TrackDetails,

} from '../componenet/MusicPlayerComponent/index';
import { useSelector } from 'react-redux';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';

const { height, width } = Dimensions.get("window")

export function MusicPlayerScreen() {

    //getting params from compactController Screeen 

    const { Obj: { duration, artwork, title, artist }, SetupPlayerValue, Playing } = useSelector(item => item);

    //get the current position of track   
    const { position } = useTrackPlayerProgress();

    //this function is called when the user stops sliding the seekbar
    const slidingCompleted = async value => {
        await TrackPlayer.seekTo(value * duration);
    };

    return (
        <View style={[styles.container]}>

            <Header />

            <AlbumArt
                img={
                    artwork
                }
            />


            <TrackDetails
                songname={title}
                artistname={artist}
                Playing={Playing}
            />

          

            <SliderComponent
                slidingCompleted={slidingCompleted}
                position={position}
                duration={duration}

            />

            <Controler
                state={SetupPlayerValue}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        backgroundColor: 'black',
        flex: 1,
        justifyContent: "center"
    },
});
