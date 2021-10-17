import React, { useEffect, useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, Image } from 'react-native'
import Slider from '@react-native-community/slider'
import AntDesign from 'react-native-vector-icons/AntDesign'
import TrackPlayer, {
    TrackPlayerEvents,
    STATE_BUFFERING,
    STATE_PLAYING,
    STATE_STOPPED,
    STATE_NONE,
    useTrackPlayerProgress
} from 'react-native-track-player'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { SongObjAction, InitialValueOfSetupPlayerAction, SetupPlayer } from '../Actions'

export function CompactController() {

    const { SetupPlayerValue } = useSelector(item => item)

    const Navigation = useNavigation()

    //make instance of useSelector
    const {Obj:{title, artwork, duration, artist} } = useSelector(item => item);

    const dispatch = useDispatch();


    //A Hook from trackplayer for find current position and duration for song
    const { position } = useTrackPlayerProgress();


    //getcurrentTrackdetails
    TrackPlayer.useTrackPlayerEvents(
        [
            TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
            TrackPlayerEvents.PLAYBACK_STATE,
            TrackPlayerEvents.REMOTE_NEXT,
            TrackPlayerEvents.REMOTE_STOP,
            TrackPlayerEvents.REMOTE_DUCK,
            TrackPlayerEvents.PLAYBACK_QUEUE_ENDED
        ],
        async event => {
            try {
                if (
                    event.type === TrackPlayerEvents.PLAYBACK_TRACK_CHANGED ||
                    event.type === TrackPlayerEvents.REMOTE_NEXT
                ) {
                    await TrackPlayer.getCurrentTrack()
                        .then(async res => {
                            await TrackPlayer.getTrack(res.toString()).then(res => {
                                dispatch(SongObjAction(res));
                            });
                        })
                        .catch(err => {
                            //console.log(err)
                        });
                }

                if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {

                    dispatch(InitialValueOfSetupPlayerAction(event.state));
                }

                if (event.type === TrackPlayerEvents.REMOTE_STOP) {
                    dispatch(InitialValueOfSetupPlayerAction(STATE_STOPPED));
                    TrackPlayer.destroy()
                }

                if (event.type === TrackPlayerEvents.PLAYBACK_QUEUE_ENDED) {
                    dispatch(InitialValueOfSetupPlayerAction(STATE_STOPPED));
                }

            } catch (error) {
                console.error(`Error Inside useTrackPlayerEvent is: ${error}`);
            }
        },
    );

    /****TrackPlayer Methode for diffrent functions*******/


    //play song
    async function play() {
        await TrackPlayer.play().catch(error =>
            console.log(`Error inside Play is ${error}`),
        );
    }

    //stop song
    async function pause() {
        await TrackPlayer.pause()
            .catch(error =>
                console.log(`Error inside pause is ${error}`),
            );
    }
    //previous song
    async function skiptonext() {
        try {
            await TrackPlayer.skipToNext()
                .then(() => TrackPlayer.play())
                .catch(error =>
                    console.log(`Error inside skiptonext is ${error}`),
                );
        } catch (e) {
            console.log(`error inside skiptonext is :${e}`);
        }
    }

    //next song
    async function skiptoprevious() {
        try {
            await TrackPlayer.skipToPrevious()
                .then(() => TrackPlayer.play())
                .catch(error =>
                    console.log(`Error inside skiptoprevious is ${error}`),
                );
        } catch (e) {
            console.log(`error inside skiptoPrevious is :${e}`);
        }
    }

    /**************Progress Bar methodes*************/

    //this function is called when the user stops sliding the seekbar
    const slidingCompleted = async value => {
        await TrackPlayer.seekTo(value * duration);
    };


    //initalLanuch effect
    useEffect(async () => {
        //always get the current State When App open's everytime
        if (SetupPlayerValue === STATE_STOPPED || SetupPlayerValue === STATE_NONE) {
            dispatch(SetupPlayer())
        }

        //get current playing song's credentials
        await TrackPlayer.getCurrentTrack()
            .then(async res => {
                if (!res) return null;
                await TrackPlayer.getTrack(res.toString())
                    .then(res => {
                        dispatch(SongObjAction(res));
                    });
            })
            .catch(err => {
                console.log(`ERROR from getCurrnentTrack is:${err}`)
            });
    }, []);

    return (
        <View style={styles.container}>
            <Slider
                style={styles.progressBar}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="white"
                maximumTrackTintColor="yellow"
                thumbTintColor="black"
                value={position / duration}
                onSlidingComplete={slidingCompleted}

            />
            <TouchableOpacity activeOpacity={0.7} onPress={
                () => {
                    Navigation.navigate("MusicPlayerScreen")
                }}>
                <View style={styles.controllerContainer}>

                    {SetupPlayerValue === STATE_BUFFERING
                        ?
                        <TouchableOpacity activeOpacity={0.7} >
                            <Text style={styles.loadingmsg}>Loading...</Text>
                        </TouchableOpacity>
                        :
                        <>
                            <Image style={styles.image} source={{ uri: `${artwork}` }} />
                            <View style={styles.nameandtitle}>
                                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                                <Text style={styles.artist} numberOfLines={1}>{artist}</Text>
                            </View>
                        </>
                    }



                    <View style={styles.controllerbtn}>


                        <TouchableOpacity activeOpacity={0.7} onPress={() => skiptoprevious()}>
                            <AntDesign name="stepbackward" size={30} color="white" style={{ padding: 10 }} />
                        </TouchableOpacity>

                        {
                            SetupPlayerValue === STATE_PLAYING ?
                                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                    pause()

                                }}>

                                    <AntDesign name="pausecircleo" size={30} color="white" style={{ padding: 10 }} />
                                </TouchableOpacity>

                                :
                                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                    if (SetupPlayerValue === STATE_STOPPED || SetupPlayerValue === STATE_NONE) {
                                        SetUpTrackPlayer()
                                    }
                                    play()
                                }}>
                                    <AntDesign name="play" size={30} color="white" style={{ padding: 10 }} />
                                </TouchableOpacity>
                        }

                        <TouchableOpacity activeOpacity={0.7} onPress={() => skiptonext()
                        }>
                            <AntDesign name="stepforward" size={30} color="white" style={{ padding: 10 }} />
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        backgroundColor: "black",
        bottom: 0,
        position: "absolute",

    },


    controllerContainer: {
        width: '100%',
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between"

    },
    loadingmsg: {
        color: "white",
        alignSelf: "center",
        fontSize: 18,
        marginLeft: 10,
        padding: 10

    },
    progressBar: {
        height: 0,
        color: "white",
        top: 0,
        left: 0,

    },
    image: {
        height: 40,
        width: 50,
        left: 10,
        position: "absolute",
        bottom: 5,
        borderRadius: 10
    },
    nameandtitle: {
        flexDirection: "column",
        alignSelf: "center",
        marginHorizontal: 150 / 2,
        width: "40%"
    },
    title: {

        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        textTransform: "capitalize",

    },
    artist: {
        color: "gray",
        fontSize: 14,
        textTransform: "capitalize"
    },
    controllerbtn: {
        right: 0.7,
        position: "absolute",
        bottom: 0,
        flexDirection: "row",

    }
})
