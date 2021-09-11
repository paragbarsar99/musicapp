import React, { useRef, useEffect, useState } from 'react'
import {
    StyleSheet, View, Animated,
    Dimensions, Text
} from 'react-native'
import { Header, UpperViewContainerofScrollView, ScrollableView } from '../componenet/index'
import { useDispatch, useSelector } from 'react-redux';
import { AlbumSongById } from '../Actions/index'
import { ActivityIndicator } from 'react-native-paper'


const height = Dimensions.get("window").height

export function AlbumSongs({ id, playlist_name, artistname, cover_image, is_album, color }) {
    //useRef make a class instance just once when component mount first time
    const scrollY = useRef(new Animated.Value(0)).current

    //state for fetch data 
    const [Loading, setLoading] = useState(true)

    //instance of dispatch
    const dispatch = useDispatch()

    //get reducer back from rootReducer
    const { Album, Playing } = useSelector(item => item)

    //make a api call for album data 
    useEffect(() => {
        if (Playing.data.id != id) {
            dispatch(AlbumSongById(id))
            //remove album id 
            setTimeout(() => {
                setLoading(false)
            }, 1000);
            console.log("called");
        } else {
            //when Album already in playing
            setLoading(false)
        }

    }, [id])


    const stickyArray = [0];
    const headingRange = [230, 280];
    const shuffleRange = [40, 80];//pixel 
    const shuffleRangeForLinearColor = [40,280];//pixel 

    const opacityHeading = scrollY.interpolate({
        inputRange: headingRange,
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    const opacityShuffle = scrollY.interpolate({
        inputRange: shuffleRange,
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    const opacityShuffleLinearColor = scrollY.interpolate({
        inputRange: shuffleRangeForLinearColor,
        outputRange: [1,0],
        extrapolate: 'clamp'
    });



    return (
        <View style={{ backgroundColor: "black", height: "100%" }}>

            {
                Album.error === null && !Loading
                    ?
                    <View style={styles.container}>
                        <>

                            {/* this code is for header */}
                            
                            <Header
                                opacityHeading={opacityHeading}
                                opacityShuffler={opacityShuffle}
                                artistname={artistname}
                                playlist_name={playlist_name}
                            />


                            {/* View contain image ,playlist name and provider  */}

                            <UpperViewContainerofScrollView
                                cover_image={cover_image}
                                playlist_name={playlist_name}
                                color={color}
                                opacityShuffler={opacityShuffleLinearColor}
                            />

                            {/* here's we start scrollview and  */}

                            <ScrollableView
                                scrollY={scrollY}
                                stickyHeaderIndices={stickyArray}
                                opacityShuffle={opacityShuffle}
                                AlbumSong={Album.data}
                                id={id}
                                playlist_name={playlist_name}
                                artistname={artistname}
                                cover_image={cover_image}
                                is_album={true}

                            />


                        </>
                    </View>
                    :
                    <ActivityIndicator size="large" style={{ alignSelf: "center", marginTop: height / 2 }} color="green" />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
    },

    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%'
    },
    downloadText: {

        color: 'white'
    }
})
    //   }
    // headerbackground: {
    //     width: "100%",
    //     height: 350,


    // },
    // headerImage: {
    //     height: 180,
    //     width: 180,
    //     resizeMode: "center",
    //     alignSelf: 'center',
    //     marginTop: 50
    // },
    // albumname: {
    //     padding: 10,
    //     fontSize: 18,
    //     color: "white",
    //     alignItems: "center",
    //     fontWeight: "bold",
    //     alignSelf: "center"
    // },
    // by: {
    //     fontSize: 12,
    //     color: "white",
    //     alignSelf: "center",
    //     alignItems: "center",
    // },
    // shufflePlayBody: {
    //     borderRadius: 30,
    //     alignSelf: "center",
    //     padding: 5,
    //     backgroundColor: "#1DB954",
    //     borderWidth: 2,
    //     marginTop: 5,
    //     height: 50,
    //     width: "35%",

    // },
    // shufflePlayText: {
    //     alignSelf: "center",
    //     fontSize: 18,
    //     color: "white",
    //     padding: 5,
    //     fontWeight: 'bold'
    // },
    // nmaeofArtist: {
    //     alignSelf: "center",
    //     justifyContent: "space-between",
    //     fontSize: 18,
    //     color: "white",
    //     marginTop: 20
    // },
    // Viewcontainer: {
    //     padding: 5,
    //     paddingBottom: 2

    // },
    // containerScroll: {
    //     paddingTop: 89,
    //     borderColor: 'red',
    //     borderWidth: 2,
    //     height: "100%"
    // },
    // containerSticky: {
    //     marginTop: 194
    // },
    // containerShuffle: {
    //     alignItems: 'center',
    //     height: 50,
    //     shadowColor: "#121212",
    //     shadowOffset: { height: -10, width: 0 },
    //     shadowOpacity: 0.2,
    //     shadowRadius: 2
    // },
    // containerStickyLinear: {
    //     position: 'absolute',
    //     top: 0,
    //     width: '100%'
    // },
    // btn: {
    //     backgroundColor: "black",
    //     borderRadius: 25,
    //     height: 50,
    //     width: 220
    // },
    // btnText: {

    //     color: "white",
    //     letterSpacing: 1,
    //     textTransform: 'uppercase'
    // },
    // containerSongs: {
    //     alignItems: 'center',
    //     backgroundColor: "black",
    //     minHeight: 540
    // },
    // row: {
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     padding: 16,
    //     width: '100%'
    // },
    // downloadText: {

    //     color: "white"
    // }


    //   {/* <FlatList
    //                 scrollEnabled={false}
    //                 contentContainerStyle={styles.Viewcontainer}
    //                 data={ListOfSongs.songs}
    //                 keyExtractor={item => item.id}
    //                 renderItem={({ item }) => {
    //                     return (
    //                         <>
    //                             {/* <Image style={styles.image} source={{ uri: item. }} ></Image> */}
    //                             <Text style={styles.nmaeofArtist}> {item.title}</Text>
    //                             <Text style={styles.nmaeofArtist}> {item.artist}</Text>
    //                         </>
    //                     )
    //                 }}
    //             /> 