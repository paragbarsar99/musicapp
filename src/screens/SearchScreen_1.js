import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useSelector, useDispatch } from 'react-redux'
import { ArtistSongById, SearchResultAction, StreamTrack, AddMusicAction } from '../Actions/FetchItemAction'
import { ActivityIndicator } from 'react-native-paper'

const height = Dimensions.get("window").height
export function SearchScreen_1() {

    //state for Access Search value 
    const [SearchValue, setSearchValue] = useState("")
    const [isLoading, setisLoading] = useState(true)

    const dispatch = useDispatch()

    const { AllSearch, Name } = useSelector(state => state)

    const { data, error } = AllSearch

    const { users, tracks, playlists, albums } = data

    // console.log(JSON.stringify(users) + " users")
    // console.log(albums.length + " albums ")
    // console.log(playlists.length + " pL")
    // console.log(tracks.length + " tracks")

    //initanse of navigation hook
    const Navigation = useNavigation()

    //get out of current navigation when screen get blurred
    React.useEffect(() => {
        Navigation.addListener("blur", () => {
            Navigation.pop()
        })
        // 1. we can make a action for remove all the 
        //last state of search
    }, [])

    //dispatch a action when ever searchValue get changed
    React.useEffect(() => {
        if (SearchValue != "") {
            dispatch(SearchResultAction(SearchValue, Name))
            setisLoading(true)
        } else {
            setisLoading(false)
        }

    }, [SearchValue])




    const Icon = () => {
        return (
            <Fontisto name="search" color={"#ffffff"} size={22} style={{ marginLeft: 13 }}
            />
        )
    }


    return (
        <View style={styles.container}>
            <SearchBar
                placeholderTextColor="gray"
                placeholder="Song,album,artist name"
                searchIcon={Icon}
                value={SearchValue}
                onChangeText={(text) => setSearchValue(text)}
                showLoading
                loadingProps={{
                    animating: isLoading,
                    color: "white",
                }}
                onClear={() => setSearchValue("")}
            />

            <View>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    {
                        error === null
                            ?
                            <>
                                {/* artist if any */}
                                {
                                    users.length != 0
                                        ?

                                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                            if (users[0].profile_picture) {
                                                Navigation.navigate("ArtistSongScreen", {
                                                    id: users[0].id,
                                                    artistname: users[0].name,
                                                    cover_image: users[0].profile_picture['150x150'] || "https://cdn6.f-cdn.com/contestentries/1485199/27006121/5ca3e39ced7f1_thumb900.jpg"

                                                })
                                            }
                                            
                                        }}>
                                            <View style={styles.artistContainer}>
                                                {
                                                    users[0].profile_picture ?
                                                        <Image source={{ uri: `${users[0].profile_picture['150x150']}` }} style={styles.artistImage} />
                                                        :
                                                        <Image source={{ uri: "https://cdn6.f-cdn.com/contestentries/1485199/27006121/5ca3e39ced7f1_thumb900.jpg" }} style={styles.artistImage} />
                                                }

                                                <View style={styles.artistNameContainer}>
                                                    {
                                                        users[0].name ?
                                                            <>
                                                                <Text style={styles.artistName}>{`${users[0].name}`}</Text>
                                                                <Text style={styles.artistType}>Artist</Text>
                                                            </>
                                                            :
                                                            null
                                                    }
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        null
                                }
                                {/* albums if any */}
                                {
                                    albums.length != 0 ?
                                        <View>
                                            <Text style={styles.headline}>Featuring {users[0].name}</Text>
                                            <FlatList
                                                contentContainerStyle={{ padding: 5 }}
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                data={albums}
                                                keyExtractor={item => item.id}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <TouchableOpacity activeOpacity={0.7} onPress={() => Navigation.navigate("AlbumPlaylist", {
                                                            id: item.id,
                                                            cover_image: item.artwork[`150x150`] || "https://cdn6.f-cdn.com/contestentries/1485199/27006121/5ca3e39ced7f1_thumb900.jpg",
                                                            playlist_name: item.playlist_name,
                                                        })}>
                                                            {
                                                                item.artwork ?
                                                                    <View style={styles.albumContainer}>
                                                                        <Image source={{ uri: item.artwork['150x150'] }} style={styles.albumImage} />
                                                                        <Text style={styles.albumName} numberOfLines={1}>{item.title} </Text>
                                                                    </View>
                                                                    :
                                                                    null
                                                            }
                                                        </TouchableOpacity>
                                                    )

                                                }}
                                            />
                                        </View>
                                        :
                                        null
                                }
                                {/* playlist if any */}
                                {
                                    playlists.length != 0 ?
                                        <View>
                                            <Text style={styles.headline}>Playlists {users[0].name}</Text>
                                            <FlatList
                                                contentContainerStyle={{ padding: 5 }}
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                data={playlists}
                                                keyExtractor={item => item.id}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <TouchableOpacity activeOpacity={0.7} onPress={() => Navigation.navigate("AlbumPlaylist", {
                                                            id: item.id,
                                                            cover_image: item.artwork[`150x150`] || "https://cdn6.f-cdn.com/contestentries/1485199/27006121/5ca3e39ced7f1_thumb900.jpg",
                                                            playlist_name: item.playlist_name,
                                                        })}>
                                                            {item.artwork ?
                                                                <View style={styles.playlistContainer}>
                                                                    <Image source={{ uri: item.artwork['150x150'] }} style={styles.playlistImage} />
                                                                    <Text style={styles.playlistName} numberOfLines={1}>{item.title} </Text>
                                                                </View>
                                                                :
                                                                null
                                                            }

                                                        </TouchableOpacity>
                                                    )

                                                }}
                                            />
                                        </View>
                                        :
                                        null
                                }
                                {/* Tracks if any*/}
                                {
                                    tracks.length != 0 ?
                                        <View>
                                            <Text style={styles.headline}>Related Tracks</Text>
                                            <FlatList
                                                contentContainerStyle={{ padding: 5 }}
                                                showsVerticalScrollIndicator={false}
                                                data={tracks}
                                                keyExtractor={item => item.id}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <TouchableOpacity activeOpacity={0.7} onPress={() => Navigation.navigate("TrackScreen", {
                                                            id: item.id,
                                                            title: item.title,
                                                            artwork: item.artwork['150x150'],
                                                            user: item.user.name,
                                                            duration: item.duration,
                                                            genre: item.genre
                                                        })}>
                                                            {item.artwork ?
                                                                <View style={styles.trackContainer}>
                                                                    <Image source={{ uri: item.artwork['150x150'] }} style={styles.trackImage} />
                                                                    <View>
                                                                        <Text style={styles.trackName} numberOfLines={1}>{item.title} </Text>
                                                                        <Text style={styles.username} numberOfLines={1}>{item.user.name} </Text>
                                                                    </View>
                                                                </View>
                                                                :
                                                                null}

                                                        </TouchableOpacity>
                                                    )

                                                }}
                                            />
                                        </View>
                                        :
                                        null
                                }
                            </>
                            :
                            SearchValue === ""
                                ?
                                <>
                                    <Text style={styles.helpMessage}> Search What You Like,Artist,Song,Albums🙂</Text>
                                </>
                                :
                                <Text style={styles.helpMessage}>No Result Found!</Text>
                    }
                </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#121212'
    },
    artistContainer: {
        flexDirection: "row"
    },

    artistImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
        top: 10,
        position: "absolute",
        left: 20,

    },
    artistNameContainer: {
        flexDirection: "column",
        left: 90,
        padding: 10
    },
    artistName: {
        color: "white",
        fontSize: 16,
        padding: 2,
        textTransform: "capitalize"
    },
    artistType: {
        color: "gray",
        fontSize: 13,
        textTransform: "capitalize"
    },
    headline: {
        fontWeight: "bold",
        alignSelf: "center",
        padding: 5,
        color: "white",
        margin: 5

    },
    albumContainer: {
        flexDirection: "column",
        padding: 5,
        justifyContent: "space-between"
    },
    albumImage: {
        height: 150,
        width: 150,
        padding: 3
    },
    albumName: {
        color: "gray",
        fontSize: 13,
        padding: 3,
        textTransform: "capitalize",
        width: 120,
        alignSelf: "center"
    },
    playlistContainer: {
        flexDirection: "column",
        padding: 5,
        justifyContent: "space-between",

    },
    playlistImage: {
        height: 150,
        width: 150,
        padding: 3
    },
    playlistName: {
        color: "gray",
        fontSize: 13,
        padding: 3,
        textTransform: "capitalize",
        width: 120,
        alignSelf: "center"
    },
    trackContainer: {
        flexDirection: "row",
        padding: 5,
    },
    trackImage: {
        height: 60,
        width: 60,
        padding: 3
    },
    trackName: {
        color: "white",
        fontSize: 13,
        padding: 5,
        textTransform: "capitalize",
        fontWeight: "bold"

    },
    username: {
        color: "gray",
        fontSize: 11,
        textTransform: "capitalize",
        padding: 5
    },
    helpMessage: {
        alignSelf: "center",
        color: "gray",
        marginTop: height / 2,
        fontSize: 16,
        textTransform: "capitalize"

    },


})

