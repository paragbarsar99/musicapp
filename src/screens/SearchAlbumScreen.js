import React, { useEffect, useState, useRef } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
import { SongByGenreAction } from '../Actions';
import { ActivityIndicator } from 'react-native-paper';


const { height, width } = Dimensions.get("window")

export const SearchAlbumScreen = ({ route }) => {

    //get the params form route.screen 
    const { Pname } = route.params

    //storing Animated Object value in useRef
    const scrollY = useRef(new Animated.Value(0)).current

    const [isLoading, setisLoading] = useState(true)

    //redux instance
    const dispatch = useDispatch()

    const { Genre } = useSelector(state => state)

    //intanse of navigation 
    const Navigation = useNavigation()


    const shuffleRange = [40, 80];//pixel value


    const opacityShuffle = scrollY.interpolate({
        inputRange: shuffleRange,
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    useEffect(() => {
        // dispath a action for every playlist name
        dispatch(SongByGenreAction(Pname))
        setTimeout(() => {
            setisLoading(false)
        }, 1090);

    }, [Pname])

    function MoveToAlbum(item) {
        const prop = {
            id: item.id,
            playlist_name: item.playlist_name,
            artistname: item.user.name,
        }

        if (item.artwork) {
            Navigation.navigate("GenreSongScreen", {
                ...prop,
                cover_image: item.artwork["150x150"]
            })
        } else {
            Navigation.navigate("GenreSongScreen", {
                ...prop,
               
            })
        }
    }
    const PopulerListTitle = () => (
        <Text style={styles.itemText} numberOfLines={1}>Populer Playlist's</Text>
    )


    const Header = () => (

        <>
            <Animated.View style={[styles.headerTitle, { opacity: opacityShuffle }]}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: "white" }} numberOfLines={1}>Populer Playlist's in {Pname}</Text>
            </Animated.View>
        </>
    )


    //list of Album's
    const ListOfAlbum = () => (
        <Animated.FlatList
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            ListHeaderComponent={PopulerListTitle()}
            contentContainerStyle={styles.containerContainerStyle}
            numColumns={2}
            data={Genre.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.7} onPress={() => MoveToAlbum(item)}>
                    <View style={styles.imageContainer}>
                        {
                            !item.artwork
                                ?
                                <Image
                                    source={require('../assets/images/rock.png')}
                                    style={styles.itemPhoto}
                                    resizeMode="contain"
                                />
                                :
                                <Image
                                    source={{
                                        uri: item.artwork['150x150']
                                    }}
                                    style={styles.itemPhoto}
                                    resizeMode="contain"
                                />

                        }
                    </View>
                    <View style={{ alignSelf: "center", width: 150, }}>
                        <Text style={styles.playlistname} numberOfLines={1}>{item.playlist_name} </Text>
                    </View>
                    <Text style={styles.followers}> Total Play Count</Text>
                    <Text style={styles.followers}> {item.total_play_count}</Text>
                </TouchableOpacity>
            )}
        />
    )


    return (
        <View style={styles.container}>
            {
                Genre.error === null && !isLoading
                    ?
                    <>
                        <Header />

                        <ListOfAlbum />
                    </>
                    :
                    <ActivityIndicator size="large" color="green" style={{ alignSelf: "center", marginTop: height / 2 }} />

            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#121212",

    },
    containerContainerStyle: {
        paddingBottom: 70,
        alignSelf: "center",
        justifyContent: "space-around",
        marginVertical: 50
    },
    imageContainer: {
        marginTop: 20,
        margin: 10
    },
    itemPhoto: {
        width: (width - 20) / 2,
        height: 180,
    },
    itemText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
        alignSelf: "center",
    },
    followers: {
        alignSelf: "center",
        fontWeight: "bold",
        textTransform: 'capitalize',
        color: "white",
        fontSize: 15,
        padding: 5


    },
    playlistname: {
        alignSelf: "center",
        fontWeight: "bold",
        textTransform: 'capitalize',
        color: "white",
        fontSize: 15,
        padding: 5,
    },
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
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 24,
        position: 'absolute',
        top: 0,
        width: '100%',


    },
    headerTitle: {
        marginTop: 10,
        paddingHorizontal: 10,
        alignSelf: "center",
        padding: 10
    },
    containerLinear: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 0
    },

})

// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'

// export  function SearchAlbumScreen() {
//     return (
//         <View>
//             <Text>helloe</Text>
//         </View>
//     )
// }

// const styles = StyleSheet.create({})
