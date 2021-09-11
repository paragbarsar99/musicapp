import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux';
const width = Dimensions.get("window").width

export const Header = () => {
    //instance of navigation prop

    const { Playing, Obj } = useSelector(state => state)

    const Navigation = useNavigation()
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => Navigation.pop()} style={styles.lowerArrow} activeOpacity={0.7}>
                <MaterialIcons name="keyboard-arrow-down" style={{ left:5 , position: "absolute", marginTop: 15 }} size={28} color="white" />
                <Text>hello</Text>
            </TouchableOpacity>

            <View style={styles.MiddleContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                    Playing.data.is_album ?
                        Navigation.navigate("AlbumPlaylist", {
                            id: Playing.data.id,
                            cover_image: Playing.data.cover_image,
                            playlist_name: Playing.data.playlist_name,
                            artistname: Playing.data.artist
                        })
                        :
                        Playing.data.is_Track ?
                            Navigation.navigate("TrackScreen", {
                                id: Playing.data.id,
                                artwork: Playing.data.cover_image,
                                title: Playing.data.title,
                                user: Playing.data.artistname,

                            })
                            :
                            Navigation.navigate("ArtistSongScreen", {
                                id: Playing.data.id,
                                cover_image: Playing.data.cover_image,
                                artistname: Playing.data.artist
                            })
                }}>
                    {Playing.data.is_album ?
                        <>
                            <Text style={styles.fromWhere}> Playing From Album</Text>
                            <Text style={styles.songName}>{Playing.data.playlist_name || "Album"}</Text>
                        </>
                        :
                        <>

                            <Text style={styles.fromWhere}> Playing From Artist</Text>
                            <Text style={styles.songName}>{Obj.artist || "Artist"}</Text>
                        </>
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.QueueContainer}>
                <Entypo name="dots-three-vertical" style={{ right: 2, position: "absolute", marginTop: 20 }} size={20} color="white" />
            </View>
        </View>
    )
};



const styles = StyleSheet.create({
    container: {
        height: 72,
        paddingTop: 20,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
    },
    lowerArrow: {
        left: 3,
        position: "absolute",
    },
    MiddleContainer: {
        alignSelf: "center",
        marginLeft: width / 3,
        top: 5,
        position: "absolute"
    },
    fromWhere: {
        fontSize: 14,
        alignSelf: "center",
        color: "white"
    },
    songName: {
        fontWeight: "bold",
        fontSize: 14,
        padding: 1,
        alignSelf: "center",
        color: "white"
    },
    QueueContainer: {
        right: 3,
        position: "absolute"
    }
});