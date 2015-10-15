'use strict';

import Dispatcher from '../dispatcher';
import {PLAYLIST_ADD_TRACKS, PLAYLIST_REMOVE_TRACK, PLAYLIST_LOADING, PLAYLIST_REMOVE_TRACKS, PLAYLIST_CREATED, PLAYLIST_SAVING} from '../constants/constants';
import Spotify from '../core/Spotify';

let PlaylistActions = {

  search: (text) => {
    Dispatcher.dispatch({
      type: PLAYLIST_LOADING
    });
    Spotify.search(text, (tracks, mainTrack) => {
      Dispatcher.dispatch({
        type: PLAYLIST_ADD_TRACKS,
        tracks: tracks,
        mainTrack: mainTrack
      });
    });
  },

  removeTracks: () => {
    Dispatcher.dispatch({
      type: PLAYLIST_REMOVE_TRACKS
    });
  },

  removeTrack: (index) => {
    Dispatcher.dispatch({
      type: PLAYLIST_REMOVE_TRACK,
      index: index
    });
  },

  save: (userId, name, isPublic, tracks) => {
    Dispatcher.dispatch({
      type: PLAYLIST_SAVING
    });
    // Spotify.savePlaylist(userId, name, isPublic, tracks).then((response) => {
    //   Dispatcher.dispatch({
    //     type: PLAYLIST_CREATED,
    //     response: response
    //   });
    // });
  }

};

export default PlaylistActions;
