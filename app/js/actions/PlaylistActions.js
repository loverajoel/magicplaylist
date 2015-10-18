'use strict';

import Dispatcher from '../dispatcher';
import {PLAYLIST_ADD_TRACKS, PLAYLIST_REMOVE_TRACK, PLAYLIST_LOADING, PLAYLIST_REMOVE_TRACKS, PLAYLIST_CREATED, PLAYLIST_SAVING, USER_TOKEN_ERROR, PLAYLIST_TRACK_NOT_FOUND} from '../constants/constants';
import Spotify from '../core/Spotify';
import {login} from './UserActions';

let PlaylistActions = {

  search: (text) => {
    Dispatcher.dispatch({
      type: PLAYLIST_LOADING
    });
    Spotify.search(text, (tracks, mainTrack) => {
      if (tracks.length) {
        Dispatcher.dispatch({
          type: PLAYLIST_ADD_TRACKS,
          tracks: tracks,
          mainTrack: mainTrack
        });
      } else {
        Dispatcher.dispatch({
          type: PLAYLIST_TRACK_NOT_FOUND,
          tracks: []
        });
      }
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
    Spotify.savePlaylist(userId, name, isPublic, tracks).then((response) => {
      Dispatcher.dispatch({
        type: PLAYLIST_CREATED,
        response: {}
      });
    }).catch((error) => {
      if (error.response.status === 401) {
        Dispatcher.dispatch({
          type: USER_TOKEN_ERROR
        });
        login().then(() => {
          PlaylistActions.save(userId, name, isPublic, tracks);
        });
      } else {
        Dispatcher.dispatch({
          type: PLAYLIST_SAVE_FAIL
        });
      }
    });
  }

};

export default PlaylistActions;
