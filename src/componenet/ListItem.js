import React from 'react'
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
export const ListItem = ({ item, title,Route ,user}) => {

    const Navigation = useNavigation()

    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginLeft: 2 }}
                contentContainerStyle={styles.container}
                data={item}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.imagecontainer}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => Navigation.navigate(Route, {
                            user:user,
                            id: item.id,
                            playlist_name :item.playlist_name,
                            cover_image:item.artwork["150x150"] || "https://cdn6.f-cdn.com/contestentries/1485199/27006121/5ca3e39ced7f1_thumb900.jpg",
                            is_album:item.is_album
                        })}>
                            <Image
                                source={{
                                    uri: item.artwork['150x150'] || "https://cdn6.f-cdn.com/contestentries/1485199/27006121/5ca3e39ced7f1_thumb900.jpg"
                                }}
                                style={styles.itemPhoto}
                                resizeMode="cover"
                            />
                            <Text style={styles.itemText} numberOfLines={1}>{item.playlist_name}</Text>
                        </TouchableOpacity>
                    </View>
                )}

            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    imagecontainer: {
        flexDirection: 'column',
        justifyContent: "space-between",
        padding: 10
    },

    item: {
        marginTop: 10,
        width: "100%"
    },
    itemPhoto: {
        width: 120,
        height: 120,
    },
    itemText: {
        color: "white",
        marginTop: 5,
        width: 110

    },
    title: {
        fontSize: 20,
        color: "white",
        fontWeight: 'bold',
        padding: 5,
        marginLeft: 3,
        textTransform:"capitalize"


    }
})