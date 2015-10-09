'use strict';

import Dispatcher from '../dispatcher';
import {TRACKS_ADD, TRACK_REMOVE} from '../constants/constants';
import Spotify from '../utils/Spotify';

let TrackActions = {

  search: (text) => {
    Spotify.search(text, (tracks) => {
      Dispatcher.dispatch({
        type: TRACKS_ADD,
        tracks: tracks
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
      type: REMOVE_TRACKS
    });
  },

  removeTrack: (index) => {
    Dispatcher.dispatch({
      type: TRACK_REMOVE,
      index: index
    });
  },

};

export default TrackActions;
