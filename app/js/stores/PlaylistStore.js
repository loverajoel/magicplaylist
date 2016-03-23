'use strict';

import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';
import {
  PLAYLIST_ADD_TRACKS,
  PLAYLIST_REMOVE_TRACK,
  PLAYLIST_LOADING,
  PLAYLIST_REMOVE_TRACKS,
  PLAYLIST_CREATED,
  PLAYLIST_SAVING,
  PLAYLIST_DEFAULT_SIZE,
  PLAYLIST_TRACK_NOT_FOUND,
  SEARCH_RESET
} from '../constants/constants';

let CHANGE_EVENT = 'change';

let _tracks = [];
let _playlistLength = PLAYLIST_DEFAULT_SIZE;
let _mainTrack;
let _loading = false;
let _lastPlaylist;

class PlaylistStore extends EventEmitter {
  constructor() {
    super();
    this.registerAtDispatcher();
  }

  getTracks() {
    return _tracks;
  }

  getPlaylistLength() {
    return _playlistLength;
  }

  getMainTrack() {
    return _mainTrack;
  }

  getLoading() {
    return _loading;
  }

  getLastPlaylist() {
    return _lastPlaylist;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  registerAtDispatcher() {
    Dispatcher.register((action) => {
      const {type, tracks} = action;

      switch (type) {

        case PLAYLIST_ADD_TRACKS: {
          _tracks = tracks;
          _mainTrack = action.mainTrack;
          _playlistLength = action.playlistLength;
          _loading = false;
          this.emitChange();
          break;
        }

        case PLAYLIST_REMOVE_TRACK: {
          _tracks.splice(action.index, 1);
          this.emitChange();
          break;
        }

        case PLAYLIST_LOADING: {
          _loading = true;
          this.emitChange();
          break;
        }

        case PLAYLIST_REMOVE_TRACKS: {
          _tracks = [];
          this.emitChange();
          break;
        }

        case PLAYLIST_CREATED: {
          _lastPlaylist = action.response.external_urls.spotify;
          this.emitChange();
          break;
        }

        case PLAYLIST_TRACK_NOT_FOUND: {
          _tracks = [];
          _mainTrack = null;
          _loading = false;
          this.emitChange();
          break;
        }

        case SEARCH_RESET: {
          _tracks = [];
          _mainTrack = null;
          _loading = false;
          this.emitChange();
          break;
        }

        default: {
          break;
        }

      }
    });
  }
}

export default new PlaylistStore();
