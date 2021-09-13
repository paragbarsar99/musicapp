import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, } from 'react-native';
import {
    AlbumArt,
    Header,
    SliderComponent,
    Controler,
    TrackDetails,
} from '../componenet/MusicPlayerComponent/index';
import { useSelector, useDispatch } from 'react-redux';
import { WhereIsSeekBarAction } from '../Actions';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';
import { useFocusEffect } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'

export function MusicPlayerScreen() {

    //getting params from compactController Screeen 

    const { Obj, SetupPlayerValue, Playing, SeekBar } = useSelector(item => item);

    //get the current position of track   
    const { position, duration } = useTrackPlayerProgress();

    let { slidingValue } = SeekBar
    //redux instance for dispathc action
    const dispatch = useDispatch()

    //whenUserStatrSlidnig
    function slidingStarted() {
        dispatch(WhereIsSeekBarAction({ isSeeking: true, position: position, duration: duration }));
    }

    //this function is called when the user stops sliding the seekbar
    const slidingCompleted = async value => {
        await TrackPlayer.seekTo(value * duration);
        dispatch(WhereIsSeekBarAction({ isSeeking: false, slidingValue: value, position: position, duration: duration }));
    };

  
    return (
        <View style={[styles.container]}>

            <Header />

            <AlbumArt
                img={
                    Obj.artwork
                }
            />


            <TrackDetails
                songname={Obj.title}
                artistname={Obj.artist}
                Playing={Playing}
            />

            <View style={{ flexDirection: "row", right: 5, position: "absolute", justifyContent: "space-between", width: 70, height: 70, }}>
                <AntDesign name="hearto" size={22} color="white" style={{ marginTop: 20, backfaceVisibility: 'visible' }} />
                <Entypo name="dots-three-vertical" size={20} color="white" style={{ marginTop: 20 }} />
            </View>

            <SliderComponent
                slidingValue={slidingValue}
                slidingStarted={slidingStarted}
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
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
    },
});
