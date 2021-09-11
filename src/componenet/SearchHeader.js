import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, BackHandler, Dimensions } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Fontisto from 'react-native-vector-icons/Fontisto'

const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

export function SearchHeader() {

    const Navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.SearchView}>
                <Text style={styles.searchText}>Search</Text>
                <View style={styles.beforeTap}>
                    <TouchableOpacity style={styles.searchbody} onPress={() => Navigation.navigate("SearchScreen_1")} >
                        <Fontisto name="search" color={"#000000"} size={22} style={{ left: 0, position: 'absolute', padding: 10 }} />
                        <Text style={styles.searchtext}>Search artist,songs and playlist</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
    },
    SearchView: {
        flexDirection: 'column',
        marginTop: 30,
    },
    searchText: {
        fontSize: 20,
        fontWeight: 'bold',
        top: 2,
        position: 'absolute',
        color: "white",
        padding: 2,
        left: 5
    },
    searchbody: {
        flexDirection: 'row',
        alignSelf: "center",
        width: "100%",
        height: 50,
        justifyContent: "space-around"
    },
    searchtext: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
    },
    beforeTap: {
        height: 50,
        width: "96%",
        backgroundColor: "white",
        marginTop: 40,
        borderRadius: 3,
        marginLeft: 5,
        marginRight: 5,

    },
    inputText: {
        backgroundColor: "#121212"
    },
    icon: {
        color: "white"
    }
})

