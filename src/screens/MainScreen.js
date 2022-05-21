import React  from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ListItem, Top10Artist} from '../componenet/index';
import {HomeScreenDataAction} from '../Actions/index';

import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';

import {CompactController} from './CompactController';

import {STATE_STOPPED} from 'react-native-track-player';

import {height} from '../utils/constants/dimesions'

export const MainScreen = () => {
  const dispatch = useDispatch();

  const {Tracks, Hit, Top10, SetupPlayerValue} = useSelector(item => item);

  React.useLayoutEffect(() => { 
    dispatch(HomeScreenDataAction());
  }, []);

  //check id network error occured
  const NetworkError = () => {
    console.log("net");
    if(Tracks.error != null){
      if(Tracks.error === "Network Error"){
        Alert.alert(
          'Something Went Wrong',
          `Check Your Data Connection`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => 'ok is pressed'},
          ],
          {cancelable: true},
          );
        }else{
          Alert.alert(
            'Something Went Wrong',
            `${Tracks.error}`,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => 'ok is pressed'},
            ],
            {cancelable: true},
            );
          }
        }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" />
      {Tracks.data !== null ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 40}}>
            <Top10Artist data={Top10.data} title="Top #10 Artist Songs" />

            {/* 
                 Agla plan hai firebase sa connection 
                 recent plays ki ek list nikal ka show kar na hai
                 or
                 playlist and fav song ka collection bhi!! 
             */}

            <ListItem
              item={Tracks.data}
              title="Top #10 Trending This Week"
              user={'MainScreen'}
              Route={'AlbumPlaylist'}
            />

            <ListItem
              item={Hit.data}
              title="Top 50 All TimeHit's"
              gotoScreen="AlbumPlaylist"
              user={'MainScreen'}
              Route={'AlbumPlaylist'}
            />
          </ScrollView>
        </>
      ) :
        <>
          {NetworkError()}
          <ActivityIndicator
            size="large"
            color="green"
            style={{alignSelf: 'center', marginTop: height / 2}}
          />
        </>
     }
      {SetupPlayerValue === STATE_STOPPED ? null : <CompactController />}
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
