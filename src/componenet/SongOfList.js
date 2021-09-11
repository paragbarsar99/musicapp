import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import { StreamTrack } from '../Actions'
import { useDispatch, useSelector } from 'react-redux'

const width = Dimensions.get("window").height
const height = Dimensions.get("window").weight

export function SongOfList({ data, methode }) {

    const HOSTNAME = "https://audius-disco.ams-x01.nl.supercache.org"

    const { title } = useSelector(item => item.Obj);

    function callMe(item) {

        try {
            methode({
                id: item.id,
                url: `${HOSTNAME}/v1/tracks/${item.id}/stream?barsar.noobdev`,
                title: item.title,
                artist: item.user.name,
                album: item.genre,
                artwork: item.artwork['150x150'],
                duration: item.duration
            })

        } catch (err) { console.log(`error inside methode is:${err}`) }

    }



    return (
        <View>
            <View style={styles.container}>
                {
                    data.map(item => (

                        <View style={styles.viewcontainer} key={item.id}>
                            {title != item.title
                                ?
                                <TouchableOpacity onPress={() => callMe(item)}>

                                    <Text style={styles.songname}>{item.title} </Text>
                                    {!item.is_album
                                        ?
                                        <Text style={styles.artistName}>{item.user.name || "Artist"} </Text>
                                        :
                                        null
                                    }
                                </TouchableOpacity>
                                :
                                <TouchableOpacity activeOpacity={0.7}>
                                    <Text style={styles.songPlaying}>{item.title} </Text>
                                    {!item.is_album
                                        ?
                                        <Text style={styles.artistPlaying}>{item.user.name || "Artist"} </Text>
                                        :
                                        null
                                    }
                                </TouchableOpacity>
                            }
                        </View>
                    ))
                }
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingBottom: 30,
        justifyContent: "space-between",
        marginTop: 10,
        marginLeft: 5

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
        marginLeft: 1,
        textTransform: "capitalize"
    },
    artistName: {
        color: "gray",
        fontSize: 13,
        marginTop: 2,
        textTransform: "capitalize"

    },
    songPlaying: {
        color: "green",
        fontSize: 16,
        marginLeft: 1,
        textTransform: "capitalize"
    },
    artistPlaying: {
        color: "gray",
        fontSize: 13,
        marginTop: 2,
        textTransform: "capitalize"
    },
    children: {
        flexGrow: 1,
    },
    coverimage: {
        height: 200,
        width: 200
    }
})
