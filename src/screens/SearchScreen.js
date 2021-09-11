import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text, Dimensions, StyleSheet, StatusBar } from 'react-native'
import { SearchHeader, ListOfGenerComp, ListItem } from '../componenet/index'
import Genre from '../utils/data/Genre.json'
import { CompactController } from './CompactController'
import { useSelector } from 'react-redux';
import { STATE_PLAYING, STATE_READY,STATE_STOPPED } from 'react-native-track-player'

const height = Dimensions.get("window").height
const width = Dimensions.get("window").width




export function SearchScreen() {
  // todys task 
  // 1. make search screen complete 
  // 2. add searching functionality
  const { SetupPlayerValue } = useSelector(item => item)

  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor="#121212" />
      <SearchHeader />
      <ListOfGenerComp />
      {SetupPlayerValue != STATE_STOPPED ?
        <CompactController />
        :
        null
      }
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: '#121212',
  }
})
