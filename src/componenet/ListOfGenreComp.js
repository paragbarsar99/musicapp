import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, View, FlatList, StyleSheet, Dimensions, Image } from 'react-native'
import Genre from '../utils/data/Genre.json'
import { useNavigation } from '@react-navigation/core'

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

export function ListOfGenerComp() {

    const Navigation = useNavigation()


    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.containerContainerStyle}
                numColumns={2}
                data={Genre.data}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.7} onPress={() => Navigation.navigate("SearchAlbumScreen", {
                        Pname: item.name,
                        color:item.color
                    })}>
                        <View style={[styles.generContainer],
                        {
                            backgroundColor:item.color,
                            borderRadius: 10,
                            width: 150,
                            height: 110,
                            marginTop: 10,
                            margin: 20

                        }
                        }>
                            <Text style={styles.generName}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "73%",

    },
    containerContainerStyle: {
        paddingBottom: 10,
        alignSelf: "center",
        justifyContent: "space-between",

    },
    generContainer: {
        backgroundColor: "#0000",
        borderRadius: 20,
        width: 50,
        height: 50
    },
    generName: {
        color: "white",
        alignSelf: "center",
        fontSize: 20,
        textTransform: "capitalize",
        marginTop: 40

    },
    image: {
        height: 150,
        width: 150
    }

})
