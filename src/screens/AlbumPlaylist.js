import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AlbumSongs } from '../componenet/index'
import backgroundcolor from '../utils/data/backgroundcolor.json'

export function AlbumPlaylist({ route }) {

    const { id, user, playlist_name, cover_image, is_album } = route.params
   
    //getting random color for background
    const  indexvalue = Math.floor(Math.random() * backgroundcolor.backgroundcolor.length)
    const  color = backgroundcolor.backgroundcolor[indexvalue]
   
    return (
        <View>
            <AlbumSongs
                user={user}
                id={id}
                playlist_name={playlist_name}
                cover_image={cover_image}
                is_album={is_album}
                color={color}
            />
        </View>
    )
}

const styles = StyleSheet.create({})

