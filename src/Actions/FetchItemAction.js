import axios from 'axios';
import hostname from '../utils/data/hostname.json';
import TrackPlayer from 'react-native-track-player';
import axiosInstance from '../utils/lib/Axios';
import {
  HOST_NAME,
  FETCH_ITEM,
  ERROR_OCCURED,
  SEARCH_RESULT,
  ALLTIME_HIT,
  TOP_10_ARTIST,
  ALBUM_SONG,
  ARTIST_SONG,
  SONG_OBJ,
  IS_INITIALIZE,
  SEEK_BAR,
  GENRE_SONG,
  WHAT_IS_PlAYING,
} from './AllActions';

//Host Name For Make a API Req

//getting a diffrent host name each time when app open

const indexvalue = Math.floor(Math.random() * hostname.data.length);
const HOSTNAME = hostname.data[indexvalue];

//getting a host out every rendring of app
export function GetAHost() {
  return {
    type: HOST_NAME,
    payload: HOSTNAME,
  };
}

export const HomeScreenDataAction = () => async dispatch => {
  //console.log(HOSTNAME);
  try {
    axios
      .all([
        axiosInstance.get(`/v1/playlists/trending?`, {
          params: {
            time: 'week',
          },
          timeout: 5000,
        }),
        axiosInstance.get(`/v1/playlists/top?`, {
          params: {
            type: 'playlist',
            limit: 50,
          },
          timeout: 5000,
        }),
        axiosInstance.get(`/v1/full/users/genre/top?`, {
          params: {
            limit: 10,
          },
          timeout: 5000,
        }),
      ])
      .then(
        axios.spread((trending, playlist, top) => {
          console.log(trending.data + ' treding.data');
          dispatch({
            type: FETCH_ITEM,
            payload: trending.data.data.slice(0, 10),
          });
          dispatch({type: ALLTIME_HIT, payload: playlist.data.data});
          dispatch({type: TOP_10_ARTIST, payload: top.data.data});
        }),
      )
      .catch(error => {
        if (error.message === 'Network Error') {
          dispatch({
            type: ERROR_OCCURED,
            payload: error.message,
          });
        } else {
          dispatch({
            type: ERROR_OCCURED,
            payload: 'Please Try Again',
          });
        }
        console.log(`Error inside HomeScreenData is:${error}`);
      }); //), console.log(error); })
  } catch (error) {
    console.log(`error inside HomeScreenDataAction is :${error}`);
  }
};

//getting Trending Tracks of current week

//fetching tracks via album id
export function AlbumSongById(id) {
  return async dispatch => {
    try {
      await axiosInstance
        .get(`/v1/playlists/${id}/tracks?`)
        .then(res => dispatch({type: ALBUM_SONG, payload: res.data.data}))
        .catch(error =>
          dispatch({
            type: ERROR_OCCURED,
            payload: 'Opps... Something Went Wrong ' + error,
          }),
        );
    } catch (e) {
      console.log(`Error inside AllTimeHit ${e}`);
    }
  };
}

//get Artist tracks by id
export function ArtistSongById(id) {
  return async dispatch => {
    try {
      await axiosInstance
        .get(`/v1/users/${id}/tracks?`)
        .then(res => dispatch({type: ARTIST_SONG, payload: res.data.data}))
        .catch(error =>
          dispatch({
            type: ERROR_OCCURED,
            payload: 'Opps... Something Went Wrong ' + error,
          }),
        );
    } catch (e) {
      console.log(`Error inside AllTimeHit ${e}`);
    }
  };
}

//stream a track
export function StreamTrack(firstObj, data) {
  return async () => {
    try {
      let payloadValue = data.map(item => {
        return {
          id: item.id,
          url: `${HOSTNAME}/v1/tracks/${item.id}/stream?barsar.noobdev`,
          title: item.title,
          artist: item.user.name,
          album: item.genre,
          artwork: item.artwork['150x150'] || 'https://picsum.photos/100',
          duration: item.duration,
        };
      });
      await TrackPlayer.getQueue().then(async res => {
        if (res.length != 0) {
          const idsToRemove = await res.map(track => track.id);
          await TrackPlayer.remove(idsToRemove).then(async () => {
            // console.log(v[0].id);
            //check if user have select a song
            if (firstObj) {
              console.log(firstObj.id + ' firstObj');
              await TrackPlayer.add([firstObj]) //insert before current music
                .then(
                  async () =>
                    await TrackPlayer.skipToNext().then(
                      async () => await TrackPlayer.play(),
                    ),
                );
            } else {
              await TrackPlayer.add(payloadValue).then(
                async () =>
                  await TrackPlayer.skipToNext().then(
                    async () => await TrackPlayer.play(),
                  ),
              );
            }
          });
          //when user hit a song first time
        } else {
          if (firstObj) {
            await TrackPlayer.add([firstObj]).then(
              async () => await TrackPlayer.play(),
            );
          } else {
            await TrackPlayer.add(payloadValue).then(
              async () => await TrackPlayer.play(),
            );
          }
        }
      });
    } catch (err) {
      console.log(`Error inside Stream Track is: ${err}`);
    }
  };
}

//SongObj Action
export function SongObjAction(obj) {
  return {
    type: SONG_OBJ,
    payload: obj,
  };
}

//get initialvalue of setupplayer
export function InitialValueOfSetupPlayerAction(value) {
  return {
    type: IS_INITIALIZE,
    payload: value,
  };
}

//Action for Manage Seek bar position

export function WhereIsSeekBarAction(params) {
  return {
    type: SEEK_BAR,
    payload: params,
  };
}

//action for get the song list from diffrent gener
export function SongByGenreAction(id) {
  return async dispatch => {
    try {
      await axiosInstance
        .get(`/v1/playlists/search?query=${id}`)
        .then(res => dispatch({type: GENRE_SONG, payload: res.data.data}))
        .catch(error =>
          dispatch({
            type: ERROR_OCCURED,
            payload: 'Opps... Something Went Wrong ' + error,
          }),
        );
    } catch (e) {
      console.log(`Error inside AllTimeHit ${e}`);
    }
  };
}

//get the search result
export function SearchResultAction(id) {
  return async dispatch => {
    try {
      await axiosInstance
        .get(`/v1/full/search/autocomplete?`, {
          params: {
            query: id,
            limit: 5,
            kind: 'all',
          },
        })
        .then(res => {
          const {users, tracks, playlists, albums} = res.data.data;
          //check if response have no result
          if (
            !users.length &&
            !tracks.length &&
            !playlists.length &&
            !albums.length
          ) {
            dispatch({
              type: ERROR_OCCURED,
              payload: `opps Something Went Wrong... ${Err}`,
            });
          } else {
            dispatch({type: SEARCH_RESULT, payload: res.data.data});
          }
        })
        .catch(Err => {
          dispatch({
            type: ERROR_OCCURED,
            payload: `opps Something Went Wrong... ${Err}`,
          });
        });
    } catch (err) {
      console.log(`Error inside SearchResultReducer ${err}`);
    }
  };
}

export const Play = () => {
  return async () => {
    try {
      await TrackPlayer.play();
    } catch (err) {
      console.log(`error inside play is:${err}`);
    }
  };
};

export const Pause = () => {
  return async () => {
    try {
      await TrackPlayer.pause();
    } catch (err) {
      console.log(`error inside pause is:${err}`);
    }
  };
};

export const Next = () => {
  return async () => {
    try {
      await TrackPlayer.skipToNext().then(() => {
        TrackPlayer.play();
      });
    } catch (err) {
      console.log(`error inside Next is:${err}`);
    }
  };
};

export const Previous = () => {
  return async () => {
    try {
      await TrackPlayer.skipToPrevious().then(() => TrackPlayer.play());
    } catch (err) {
      console.log(`error inside previous is:${err}`);
    }
  };
};

//action for find which album is playing
export function WhatIsPlayingAction(
  id,
  artistname,
  playlist_name,
  cover_image,
  is_album,
  is_Track,
  title,
) {
  return {
    type: WHAT_IS_PlAYING,
    payload: {
      data: {
        id,
        artistname,
        playlist_name,
        cover_image,
        is_album,
        is_Track,
        title,
      },
    },
  };
}

//setupplayer
export function SetupPlayer() {
  return async dispatch => {
    try {
      await TrackPlayer.setupPlayer()
        .then(async () => {
          //give capibilities to run app on background
          await TrackPlayer.updateOptions({
            stopWithApp: true,
            alwaysPauseOnInterruption: true,
            //media control capabilites
            notificationCapabilities: [
              TrackPlayer.CAPABILITY_PLAY,
              TrackPlayer.CAPABILITY_PAUSE,
              TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
              TrackPlayer.CAPABILITY_STOP,
            ],
            capabilities: [
              TrackPlayer.CAPABILITY_PLAY,
              TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
              TrackPlayer.CAPABILITY_STOP,
              TrackPlayer.CAPABILITY_PAUSE,
            ],
            compactCapabilities: [
              TrackPlayer.CAPABILITY_PAUSE,
              TrackPlayer.CAPABILITY_PLAY,
              TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
              TrackPlayer.CAPABILITY_STOP,
            ],
          });
        })
        .then(async () => {
          await TrackPlayer.getState().then(Res => {
            dispatch(InitialValueOfSetupPlayerAction(Res));
          });
        });
      console.log('Player is initialized');
    } catch (Err) {
      console.error(Err);
    }
  };
}
