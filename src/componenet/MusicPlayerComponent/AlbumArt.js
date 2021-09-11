import React from 'react'
import { StyleSheet, Image, Text, View, Dimensions } from 'react-native'

const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

export function AlbumArt({ img }) {

    return (
        <View style={styles.container}>
            <Image source={{ uri: img  || "https://creatornode2.audius.co/ipfs/QmVKTpZKnG59vmUvNZakNKHKcvarSc42vAwE3VbvA3QNQi/480x480.jpg" }} style={styles.albumphoto} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 250,
        alignSelf: "center",
        marginTop: height / 20,

    },
    albumphoto: {
        width: 250,
        height: 250,
        alignSelf: "center"
    }
})
