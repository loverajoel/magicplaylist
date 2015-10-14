'use strict';

import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';
import {TRACKS_ADD, TRACK_REMOVE, TRACKS_LOADING, TRACKS_REMOVE} from '../constants/constants';

let CHANGE_EVENT = 'change';

let _tracks = [];
let _mainTrack;
let _loading = false;

class TrackStore extends EventEmitter {
	constructor() {
		super();
		this.registerAtDispatcher();
	}

	getTracks() {
		return _tracks;
	}

  getMainTrack() {
    return _mainTrack;
  }

  getLoading() {
    return _loading;
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

      switch(type) {

				case TRACKS_ADD: {
					_tracks = tracks;
          _mainTrack = action.mainTrack;
          _loading = false;
					this.emitChange();
					break;
				}

        case TRACK_REMOVE: {
          _tracks.splice(action.index, 1);
          this.emitChange();
          break;
        }

        case TRACKS_LOADING: {
          _loading = true;
          this.emitChange();
          break;
        }

        case TRACKS_REMOVE: {
          _tracks = [];
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

export default new TrackStore();
