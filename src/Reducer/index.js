import { combineReducers } from "redux";
import {
    TrendingTracksReducer,
    AllTimeHit,
    Top10Artist,
    AlbumSong,
    ArtistSong,
    StreamSong,
    SongObjReducer,
    InitialValueOfSetupPlayer,
    WhereIsSeekBarReducer,
    SongByGenreActionReducer,
    AllSearchResultReducer,
    WhatIsPlayingReducer
} from './FetchItemReducer'


export default rootReducer = combineReducers({
    Tracks: TrendingTracksReducer,
    Hit: AllTimeHit,
    Top10: Top10Artist,
    Album: AlbumSong,
    Artist: ArtistSong,
    Stream: StreamSong,
    Obj: SongObjReducer,
    SetupPlayerValue: InitialValueOfSetupPlayer,
    SeekBar:WhereIsSeekBarReducer,
    Genre:SongByGenreActionReducer,
    AllSearch:AllSearchResultReducer,
    Playing: WhatIsPlayingReducer
})

