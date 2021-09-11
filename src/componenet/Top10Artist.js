import React from 'react'
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function Top10Artist({ data, title }) {

    //get navigation instance 
    const Navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        {
                            <TouchableOpacity onPress={() => Navigation.navigate("ArtistSongScreen", {
                                id: item.id,
                                artist_name: item.name,
                                cover_image: item.profile_picture['150x150'] || "https://cdn6.f-cdn.com/contestentries/1485199/27006121/5ca3e39ced7f1_thumb900.jpg"
                            })}
                                activeOpacity={0.5}>
                                <Image style={styles.artistImage} source={{ uri: item.profile_picture['150x150'] || "https://cache.boston.com/resize/bonzai-fba/Globe_Photo/2011/04/14/1302796985_4480/539w.jpg" }} resizeMode="contain" />
                            </TouchableOpacity>

                        }
                        <Text style={styles.artistName}>{item.name}</Text>
                    </View>
                )
                }

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 10,


    },
    title: {
        fontSize: 20,
        color: "white",
        fontWeight: 'bold',
        padding: 8,
        marginLeft: 3

    },
    imageContainer: {
        borderRadius: 20,
        height: 180,
        width: 180,
        marginLeft: 3,

    },
    artistImage: {
        height: 120,
        width: 120,
        borderRadius: 30,
        alignSelf: 'center'
    },
    artistName: {
        // fontSize: 15,
        alignSelf: "center",
        padding: 3,
        color: "white",
    }
})
