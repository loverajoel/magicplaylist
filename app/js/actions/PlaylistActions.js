'use strict';

import Dispatcher from '../dispatcher';
import {
  PLAYLIST_ADD_TRACKS,
  PLAYLIST_REMOVE_TRACK,
  PLAYLIST_LOADING,
  PLAYLIST_REMOVE_TRACKS,
  PLAYLIST_CREATED,
  PLAYLIST_SAVING,
  USER_TOKEN_ERROR,
  PLAYLIST_TRACK_NOT_FOUND,
  PLAYLIST_SAVE_FAIL,
  PLAYLIST_LIMIT_429,
  SEARCH_RESET,
  PLAYLIST_FAILED
} from '../constants/constants';
import Spotify from '../core/Spotify';
import {login} from './UserActions';

let PlaylistActions = {

  search: (text, country, playlistLength) => {
    Dispatcher.dispatch({
      type: PLAYLIST_LOADING
    });
    Spotify.search(text, country, playlistLength, (tracks, mainTrack) => {
      if (tracks.length) {
        Dispatcher.dispatch({
          type: PLAYLIST_ADD_TRACKS,
          tracks: tracks,
          mainTrack: mainTrack
        });
        ga('send', 'event', 'event', 'new-playlist', 'new');
      } else {
        Dispatcher.dispatch({
          type: PLAYLIST_TRACK_NOT_FOUND,
          tracks: []
        });
        ga('send', 'event', 'event', 'playlist-search', 'no-result');
      }
    }, (error) => {
      ga('send', 'event', 'event', 'new-api-error', error.response.status);
      if (error.response.status === 429) {
        Dispatcher.dispatch({
          type: PLAYLIST_LIMIT_429,
          tracks: []
        });
        ga('send', 'event', 'event', 'playlist-search', '429');
      } else if (error.response.status === 401) {
        Dispatcher.dispatch({
          type: PLAYLIST_LIMIT_429,
          tracks: []
        });
        ga('send', 'event', 'event', 'playlist-search', '401');
      } else {
        Dispatcher.dispatch({
          type: PLAYLIST_FAILED
        });
        ga('send', 'event', 'event', 'playlist-search', 'error');
      }
      Dispatcher.dispatch({
        type: SEARCH_RESET
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
    Spotify.savePlaylist(userId, name, isPublic, tracks).then((response) => {
      Dispatcher.dispatch({
        type: PLAYLIST_CREATED,
        response: response
      });
      ga('send', 'event', 'event', 'playlist-save', 'saved');
    }).catch((error) => {
      if (error.response.status === 401) {
        ga('send', 'event', 'event', 'playlist-save', 'token error');
        login().then(() => {
          PlaylistActions.save(userId, name, isPublic, tracks);
        });
      } else {
        Dispatcher.dispatch({
          type: PLAYLIST_SAVE_FAIL
        });
        ga('send', 'event', 'event', 'playlist-save', 'error');
      }
    });
  }

};

export default PlaylistActions;
