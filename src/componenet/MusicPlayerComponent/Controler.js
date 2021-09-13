import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import TrackPlayer, { STATE_PLAYING, STATE_BUFFERING, STATE_PAUSED, STATE_STOPPED, STATE_NONE } from 'react-native-track-player'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch } from 'react-redux'
import { Play, Pause, Next, Previous } from '../../Actions/FetchItemAction'

export const Controler = ({ state }) => {

    const dispatch = useDispatch()


    return (
        <>
            <StatusBar backgroundColor="black" />
            <View style={styles.controlerContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => dispatch(Previous())}>
                    <AntDesign name="stepbackward" size={30} color="gray" />
                </TouchableOpacity>

                {state === STATE_BUFFERING ?
                    <TouchableOpacity activeOpacity={0.7} >
                        <ActivityIndicator size={50} color="green" style={{ justifyContent: "space-evenly" }} />
                    </TouchableOpacity>
                    :
                    <>
                        {state === STATE_PLAYING ?
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                dispatch(Pause())
                            }}>

                                <AntDesign name="pausecircleo" size={50} color="gray" />
                            </TouchableOpacity>

                            :
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                dispatch(Play())

                            }}>
                                <AntDesign name="play" size={50} color="gray" />
                            </TouchableOpacity>
                        }
                    </>
                }
                <TouchableOpacity activeOpacity={0.7} onPress={() => dispatch(Next())}>
                    <AntDesign name="stepforward" size={30} color="gray" />
                </TouchableOpacity>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    controlerContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20
    },
    prevoiusbtn: {

        borderRadius: 30
    },
    pauseplaybtn: {
        alignSelf: "center",
        borderRadius: 30
    },
    nextbtn: {
        borderRadius: 30,

    }

})
