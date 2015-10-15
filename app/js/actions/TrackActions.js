'use strict';

import Dispatcher from '../dispatcher';
import {TRACKS_ADD, TRACK_REMOVE, TRACKS_LOADING, TRACKS_REMOVE, PLAYLIST_CREATED, PLAYLIST_CREATING} from '../constants/constants';
import Spotify from '../utils/Spotify';

let TrackActions = {

  search: (text) => {
    Dispatcher.dispatch({
      type: TRACKS_LOADING
    });
    Spotify.search(text, (tracks, mainTrack) => {
      Dispatcher.dispatch({
        type: TRACKS_ADD,
        tracks: tracks,
        mainTrack: mainTrack
      });
    });
  },

  addTracks: (tracks) => {
    Dispatcher.dispatch({
      type: TRACKS_ADD,
      tracks: tracks
    });
  },

  removeTracks: () => {
    Dispatcher.dispatch({
      type: TRACKS_REMOVE
    });
  },

  removeTrack: (index) => {
    Dispatcher.dispatch({
      type: TRACK_REMOVE,
      index: index
    });
  },

  save: (userId, name, isPublic, tracks) => {
    Dispatcher.dispatch({
      type: PLAYLIST_CREATING
    });
    // Spotify.savePlaylist(userId, name, isPublic, tracks).then((response) => {
    //   Dispatcher.dispatch({
    //     type: PLAYLIST_CREATED,
    //     response: response
    //   });
    // });
  }

};

export default TrackActions;
