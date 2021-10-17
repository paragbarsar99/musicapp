import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign'

const width = Dimensions.get("window").width

export const Header = () => {
    //instance of navigation prop

    const { Playing, Obj } = useSelector(state => state)

    const Navigation = useNavigation()

    function NavigateTo() {
        Playing.data.is_album ?
            Navigation.navigate("AlbumPlaylist", {
                id: Playing.data.id,
                cover_image: Playing.data.cover_image,
                playlist_name: Playing.data.playlist_name,
                artistname: Playing.data.artistname
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
                    artist_name: Playing.data.artistname
                })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => Navigation.pop()} style={styles.lowerArrow} activeOpacity={0.7}>
                <MaterialIcons name="keyboard-arrow-down" style={{ left: 5, position: "absolute", marginTop: 15 }} size={28} color="white" />
                <Text>hello</Text>
            </TouchableOpacity>

            <View style={styles.MiddleContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={NavigateTo}>
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
                <View style={{ flexDirection: "row", right: 5, position: "absolute", justifyContent: "space-between", width: 70, height: 70, }}>
                    <AntDesign name="hearto" size={22} color="white" style={{ marginTop: 20, backfaceVisibility: 'visible' }} />
                    <Entypo name="dots-three-vertical" size={20} color="white" style={{ marginTop: 20 }} />
                </View>
            </View>
        </View>
    )
};



const styles = StyleSheet.create({
    container: {
        height: 72,
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
        justifyContent: "center"
    },
    lowerArrow: {
        left: 3,
        position: "absolute",
    },
    MiddleContainer: {
        alignSelf: "center",
        marginLeft: width / 3,
        top: 5,
        position: "absolute",
        alignItems: "center",
    
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