import React from 'react'
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'
import { LinearGradientColor, SongOfList } from './index'
import colors from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux';
import { STATE_NONE, STATE_PAUSED, STATE_STOPPED } from 'react-native-track-player'
import { Pause, Play, SetupPlayer, StreamTrack, WhatIsPlayingAction, } from '../Actions/FetchItemAction'

export function ScrollableView({ scrollY, opacityShuffler, AlbumSong, stickyHeaderIndices, id, playlist_name, artistname, cover_image, is_album,is_Track=false,title }) {


    const dispatch = useDispatch();

    const { SetupPlayerValue, Playing } = useSelector(item => item)


    //do this when hit shuffle play
    function DoThis(firstObj = false) {
        try {
      
            //action for stream song 
            dispatch(StreamTrack(firstObj, AlbumSong))
            //action for store current playing album's id
            dispatch(WhatIsPlayingAction(id, artistname, playlist_name, cover_image, is_album,is_Track,title))

            if (SetupPlayerValue === STATE_STOPPED || STATE_NONE) {
                dispatch(SetupPlayer());

            }

        } catch (Err) {
            console.log(`Error inside DoThis  function is :${Err}`);
        }
    }

    return (
        <Animated.ScrollView
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={stickyHeaderIndices}
            style={styles.containerScroll}
            contentContainerStyle={{paddingBottom:80}}
        >
            {/* this code containerSticky is container of shuffler button */}
            <View style={styles.containerSticky}>
                <Animated.View
                    style={[
                        styles.containerStickyLinear,
                        { opacity: opacityShuffler }
                    ]}
                >
                    <LinearGradientColor fill={colors.blackBlur} height={55} />
                </Animated.View>

                {/*this code is for shuffler button  */}
                <View style={styles.containerShuffle}>
                    {
                        SetupPlayerValue === STATE_STOPPED || STATE_NONE
                            ?
                            <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => DoThis()}>
                                <Text style={styles.btnText}> Shuffle Play </Text>
                            </TouchableOpacity>
                            :
                            id === Playing.data.id
                                ?
                                SetupPlayerValue === STATE_PAUSED
                                    ?
                                    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => dispatch(Play())}>
                                        <Text style={styles.btnText}> play </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => dispatch(Pause())}>
                                        <Text style={styles.btnText}> pause </Text>
                                    </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => DoThis()}>
                                    <Text style={styles.btnText}> Shuffle Play </Text>
                                </TouchableOpacity>

                    }
                </View>
            </View>


            {/*  this code is for list of songs */}

            <View style={styles.containerSongs}>
                <SongOfList data={AlbumSong} methode={DoThis} />
            </View>

        </Animated.ScrollView>

    )
}

const styles = StyleSheet.create({
    containerScroll: {
        paddingTop: 87,

    },
    containerSticky: {
        marginTop: 220
    },
    containerShuffle: {
        alignItems: 'center',
        height: 50,
        shadowColor: "black",
        shadowOffset: { height: -10, width: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        alignSelf: 'center',
        marginTop: 2

    },
    containerStickyLinear: {
        position: 'absolute',
        top: 0,
        width: '100%'
    },
    btn: {
        backgroundColor: '#57b660',
        borderRadius: 25,
        height: 50,


    },
    btnText: {
        fontSize: 18,
        color: 'black',
        letterSpacing: 1,
        alignSelf: "center",
        fontWeight: "bold",
        padding: 12
    },
    containerSongs: {
        backgroundColor: '#121212',
        minHeight: 650,


    },
    viewcontainer: {
        paddingBottom: 10,
        marginLeft: 2,
        justifyContent: "space-between",
        padding: 10,
        flexDirection: 'column'

    },
    songname: {
        color: "white",
        fontSize: 16,

    },
    artistName: {
        color: "gray",
        fontSize: 13,
        padding: 2

    },
})
