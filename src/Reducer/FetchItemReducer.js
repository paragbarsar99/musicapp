import { WHAT_IS_PlAYING, FETCH_ITEM, ERROR_OCCURED, SEARCH_RESULT, ALLTIME_HIT, TOP_10_ARTIST, ALBUM_SONG, ARTIST_SONG, STREAM_TRACK, SONG_OBJ, IS_INITIALIZE, SEEK_BAR, GENRE_SONG, } from '../Actions/AllActions'

const initialPlaying = {
    data: {
        id: "something",
        artistname: "something",
        playlist_name: "something",
        cover_image: "something",
        is_album: null,
        is_Track:null,
        title:"something",
    }
}

const initialValue =
{
    error: "something went wrong",
    data: null
}

const initialTrack = [];

const initialObj = {
    id: 0,
    title: "Title",
    artwork: "https://creatornode2.audius.co/ipfs/QmVKTpZKnG59vmUvNZakNKHKcvarSc42vAwE3VbvA3QNQi/480x480.jpg",
    artist: "Artist",
};

const initialSeekbar = {
    isSeeking: false,
    slidingValue: 0,
    position: 0,
    duration: 0
}

const SearchInitialResult = {
    data: {
        users: [],
        playlists: [],
        albums: [],
        tracks: []
    },
    error: "Something Went wrong"
}

const initialValueOfSetupPlayer = null;



//dispatching Trending Tracks 
export const TrendingTracksReducer = (state = initialValue, action) => {
    switch (action.type) {
        case ERROR_OCCURED:
            return {
                error: action.payload,
                data: null
            }

        case FETCH_ITEM:
            return {
                error: null,
                data: action.payload
            }

        default:
            return state
    }
}

//dispatching ALLTimeHites
export const AllTimeHit = (state = initialValue, action) => {

    switch (action.type) {
        case ERROR_OCCURED:
            return {
                error: action.payload,
                data: null
            }

        case ALLTIME_HIT:
            return {
                error: null,
                data: action.payload
            }

        default:
            return state
    }

}

//dispatching top 10 Artist
export const Top10Artist = (state = initialValue, action) => {

    switch (action.type) {
        case ERROR_OCCURED:
            return {
                error: action.payload,
                data: null
            }

        case TOP_10_ARTIST:
            return {
                error: null,
                data: action.payload
            }

        default:
            return state
    }

}
//dispatching ALBUM SONG BY ID
export const AlbumSong = (state = initialValue, action) => {

    switch (action.type) {
        case ERROR_OCCURED:
            return {
                error: action.payload,
                data: null
            }


        case ALBUM_SONG:
            return {
                error: null,
                data: action.payload
            }

        default:
            return state
    }

}

//dispatching action for artist song
export const ArtistSong = (state = initialValue, action) => {

    switch (action.type) {
        case ERROR_OCCURED:
            return {
                error: action.payload,
                data: null
            }


        case ARTIST_SONG:
            return {
                error: null,
                data: action.payload
            }

        default:
            return state
    }

}
//dispatch a action for a Stream Track
export const StreamSong = (state = initialTrack, action) => {

    switch (action.type) {

        case STREAM_TRACK:
            return action.payload

        default:
            return state
    }

}

//dispatching a action for Getting Obj of a Song 
export const SongObjReducer = (state = initialObj, action) => {
    switch (action.type) {
        case SONG_OBJ:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }

}

//get initialvalue of tracksetupplayer  
export const InitialValueOfSetupPlayer = (state = initialValueOfSetupPlayer, action) => {
    switch (action.type) {
        case IS_INITIALIZE:
            return action.payload

        default:
            return state
    }

}


//Get The Current Progressbar Position dispatch

export const WhereIsSeekBarReducer = (state = initialSeekbar, action) => {

    switch (action.type) {
        case SEEK_BAR: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}

//get a payload from GenreAction 
export const SongByGenreActionReducer = (state = initialValue, action) => {

    switch (action.type) {
        case ERROR_OCCURED:
            return {
                error: action.payload,
                data: null
            }

        case GENRE_SONG:
            return {
                error: null,
                data: action.payload
            }

        default:
            return state
    }

}

//Reducer for get the Search Result
export const AllSearchResultReducer = (state = SearchInitialResult, action) => {

    switch (action.type) {

        case ERROR_OCCURED:
            return {
                error: action.payload,
                data: state.data
            }

        case SEARCH_RESULT: {
            return {
                error: null,
                data: action.payload
            }
        }

        default:
            return state
    }

}

//dispatch a action find which album is playing

export function WhatIsPlayingReducer(state = initialPlaying, action) {

    switch (action.type) {
        case WHAT_IS_PlAYING: {
            return action.payload
        }
        default:
            return state
    }
}





