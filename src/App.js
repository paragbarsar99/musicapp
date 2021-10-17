import React, { useState } from 'react'
import { StyleSheet, View, Alert,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import store from './store/index'
import { Provider } from 'react-redux'
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  MainScreen,
  SearchScreen,
  LoadingScreen,
  SearchScreen_1,
  AlbumPlaylist,
  ArtistSongScreen,
  MusicPlayerScreen,
  SearchAlbumScreen,
  GenreSongScreen,
  TrackScreen,
  CompactController
} from './common/screens'


const Tab = createMaterialBottomTabNavigator()
const StackTab = createStackNavigator();

const TextScreen = () => (
  <View>
    <Text>
      hello
    </Text>
  </View>
)



function AlbumWork() {
  return (

    <StackTab.Navigator
      headerMode='none'
      initialRouteName="MainScreen"
    >

      <StackTab.Screen
        name="MainScreen"
        component={MainScreen}

      />
      <StackTab.Screen
        name="AlbumPlaylist"
        component={AlbumPlaylist}

      />
      <StackTab.Screen
        name="ArtistSongScreen"
        component={ArtistSongScreen}
      />

      <StackTab.Screen
        name="TrackScreen"
        component={TrackScreen}
      />

      <StackTab.Screen
        name="CompactController"
        component={CompactController}

      />


    </StackTab.Navigator>

  )
}


function SearchTabs() {
  return (
    <StackTab.Navigator
      initialRouteName="SearchScreen"
      headerMode="none"
    >
      <StackTab.Screen
        name="SearchScreen"
        component={SearchScreen}
      />
      <StackTab.Screen
        name="SearchScreen_1"
        component={SearchScreen_1}
      />

      <StackTab.Screen
        name="SearchAlbumScreen"
        component={SearchAlbumScreen}
      />

      <StackTab.Screen
        name="GenreSongScreen"
        component={GenreSongScreen}
      />
    
    </StackTab.Navigator>
  )
}

function Home() {


  const [Loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 2000)

  if (Loading) return <LoadingScreen />

  return (
    <Tab.Navigator
      screenOptions={() => {

      }}
      activeColor="#FFFFFF"
      barStyle={styles.container}

    >
      <Tab.Screen
        name="Albumwork"
        component={AlbumWork}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Foundation name="home" color={color} size={28} />
          )
        }
        }
      />

      <Tab.Screen
        name="SearchTabs"
        component={SearchTabs}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <EvilIcons name="search" color={color} size={28} />
          )
        }}
      />

    </Tab.Navigator>
  )
}

const globalStackTab = createStackNavigator()

function GlobalScreen() {

  return (
    <>
      <globalStackTab.Navigator
        headerMode="none"
        mode="card"
      >

        <globalStackTab.Screen
          name="Home"
          component={Home}
        />

        {/* this screen is playing as global screen we can access it from anywhere  */}
        <globalStackTab.Screen
          name="MusicPlayerScreen"
          component={MusicPlayerScreen}
        />

      </globalStackTab.Navigator>


    </>
  )
}

export default App = () => {

  return (

    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <GlobalScreen />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  )
}


const styles = StyleSheet.create({

  container: {
    backgroundColor: '#302C2C',
    height: 48
  }

})


