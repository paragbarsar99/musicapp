import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ArtistSong } from '../componenet/ArtistSong'
import backgroundcolor from '../utils/data/backgroundcolor.json'

export function ArtistSongScreen({ route }) {

    const { id, artist_name, cover_image } = route.params

    let indexvalue = Math.floor(Math.random() * backgroundcolor.backgroundcolor.length)
    let color = backgroundcolor.backgroundcolor[indexvalue]

    return (
        <View>
            <ArtistSong
                id={id}
                artistname={artist_name}
                cover_image={cover_image}
                color={color}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
