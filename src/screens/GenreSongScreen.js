import React from 'react'
import { StyleSheet,  View } from 'react-native'
import { AlbumSongs } from '../componenet'
import backgroundcolor from '../utils/data/backgroundcolor.json'

export function GenreSongScreen({ route }) {
    const { id, playlist_name, artistname,cover_image } = route.params
    
    const indexvalue = Math.floor(Math.random() * backgroundcolor.backgroundcolor.length)
    const color = backgroundcolor.backgroundcolor[indexvalue]
    return (
        <View>
            <AlbumSongs
                id={id}
                playlist_name={playlist_name}
                artistname={artistname}
                cover_image={cover_image}
                color={color}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
