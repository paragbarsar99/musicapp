import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Top10Artist } from '../componenet/index'
import { TrendingTracks, AllTimeHit, TOP10ARTIST } from '../Actions/index'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { CompactController } from './CompactController';
import { STATE_STOPPED } from 'react-native-track-player';

const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

export const MainScreen = () => {

  const [Connection, setConnection] = useState(true)

  const dispatch = useDispatch();

  const { Tracks, Hit, Top10, SetupPlayerValue } = useSelector(item => item)

  function RequsetForData() {
    dispatch(TrendingTracks());
    dispatch(AllTimeHit());
    dispatch(TOP10ARTIST())
  }

  React.useEffect(() => {
    RequsetForData()
  }, [])

  console.log(Tracks.error);

  //check id network error occured
  const NetworkError = () => (
    <View style={{ marginTop: width /1, alignSelf: "center", }}>
      <Text style={{ fontSize: 24, color: "white", alignSelf: "center" }}>Check Your Internet Connection</Text>
      <View style={{ height: 110, width: 110, alignSelf: "center" }}>
        <TouchableOpacity activeOpacity={0.7} style={{ borderWidth: 2, backgroundColor: "green", borderRadius: 20 }} onPress={() => RequsetForData()}>
          <Text style={{ fontSize: 24, color: "white", alignSelf: "center" }}>Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  )




  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" />
      {Tracks.data !== null && Hit.data !== null && Top10.data !== null
        ?
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }} >
            <Top10Artist data={Top10.data} title="Top #10 Artist Songs" />

            {
             /* 
                 Agla plan hai firebase sa connection 
                 recent plays ki ek list nikal ka show kar na hai
                 or
                 playlist and fav song ka collection bhi!! 
             */}

            <ListItem item={Tracks.data} title="Top #10 Trending This Week" user={"MainScreen"} Route={"AlbumPlaylist"} />

            <ListItem item={Hit.data} title="Top 50 All TimeHit's" gotoScreen="AlbumPlaylist" user={"MainScreen"} Route={"AlbumPlaylist"} />
          </ScrollView>

        </>
        :
        Tracks.error != null && Tracks.error != 'something went wrong' 
          ?
            NetworkError()
          :
          <ActivityIndicator size="large" color="green" style={{ alignSelf: "center", marginTop: height / 2 }} />
      }
      {
        SetupPlayerValue === STATE_STOPPED ?
          null
          :
          <CompactController />
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },

});
