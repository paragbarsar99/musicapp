import React from 'react'
import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import { LinearGradientColor } from './index'

export function UpperViewContainerofScrollView({ cover_image, playlist_name, artistname, color, opacityShuffler }) {

    
    const ArtistImage = () => (
        <Animated.Image source={{ uri: cover_image || "https://cdn6.f-cdn.com/contestentries/1485199/27006121/5ca3e39ced7f1_thumb900.jpg" }} style={[styles.artistimage,
        {
             transform: [
                {
                    translateY: opacityShuffler
                },
                {
                    scale: opacityShuffler
                }
            ]
        }]
        } />
    )

    const NonArtistImage = () => (
        <Animated.Image source={{ uri: cover_image || "https://cdn6.f-cdn.com/contestentries/1485199/27006121/5ca3e39ced7f1_thumb900.jpg" }} style={[styles.image,
        {
            transform: [
                {
                    translateY: opacityShuffler
                },
                {
                    scale: opacityShuffler
                }
            ]
        }
        ]} />
    )

    return (
    
        <View style={styles.containerFixed}>

            <Animated.View style={[styles.containerLinear, { opacity: opacityShuffler }]}>
                <LinearGradientColor fill={color} height={320} />
            </Animated.View>

            <Animated.View style={[styles.containerImage, {

            }]}>
                {
                    cover_image ?
                        !playlist_name ?
                            <ArtistImage />
                            :
                            <NonArtistImage />
                        :
                        !playlist_name ?
                            <ArtistImage />
                            :
                            <NonArtistImage />

                }
            </Animated.View>

            <View style={styles.containerTitle}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
                    {playlist_name || artistname || "Artist"}
                </Text>
            </View>
            <View style={styles.containerAlbum}>
                {!artistname ?
                    <Text style={styles.albumInfo} numberOfLines={1}>
                        by {"Audius" || playlist_name}
                    </Text>
                    :
                    null
                }
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    containerFixed: {
        alignItems: 'center',
        paddingTop: 60,
        position: 'absolute',
        width: '100%'
    },
    containerLinear: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 0
    },
    containerImage: {
        shadowColor: "black",
        shadowOffset: { height: 8, width: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        zIndex: 0
    },
    image: {
        height: 130,
        marginBottom: 16,
        width: 130,

    },
    artistimage: {
        height: 148,
        marginBottom: 16,
        width: 148,
        borderRadius: 100

    }, containerTitle: {
        marginTop: 0,
        zIndex: 0
    },
    title: {
        fontSize: 16,
        color: "white",
        marginBottom: 8,
        paddingHorizontal: 24,
        textAlign: 'center',
        fontWeight: "bold"
    },
    containerAlbum: {
        zIndex: 0
    },
    albumInfo: {
        fontSize: 14,
        color: "gray",
        marginBottom: 48
    },
})
