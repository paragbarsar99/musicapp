import React from 'react'
import { StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity } from 'react-native'
import { LinearGradientColor } from './index'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from '../constants/colors'

const width = Dimensions.get("window").width

export function Header({ opacityHeading, opacityShuffler, playlist_name, artistname, }) {



    return (
        <View style={styles.containerHeader}>

            <View style={{ flexDirection: "row", right: 5, position: "absolute", justifyContent: "space-between", width: 70, height: 70, }}>

                <AntDesign name="hearto" size={22} color="white" style={{ marginTop: 20, }} onPress={() => console.log("love")} />

                <Entypo name="dots-three-vertical" size={20} color="white" style={{ marginTop: 20 }} />
            </View>


            <Animated.View
                style={[styles.headerLinear, { opacity: opacityHeading }]}
            >
                <LinearGradientColor fill={colors.blackBlur} height={89} />
            </Animated.View>

            <View style={styles.header}>

                <Animated.View style={{ opacity: opacityShuffler }}>
                    <Text style={styles.headerTitle} numberOfLines={1}>{playlist_name || artistname}</Text>
                </Animated.View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerHeader: {
        height: 89,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 100,


    },
    headerLinear: {
        height: 89,
        width: '100%',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 24,
        position: 'absolute',
        top: 6,
        width: '100%',
        alignSelf:"center",
    
    },
    headerTitle: {
        fontSize: 18,
        color: "white",
        marginTop: -10,
        paddingHorizontal: 10,
        textAlign: 'center',
        fontWeight: "bold",
        alignSelf: "center",

    },
})
