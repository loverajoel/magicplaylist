'use strict';

import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';
import {TRACKS_ADD, TRACK_REMOVE} from '../constants/constants';

let CHANGE_EVENT = 'change';

let _tracks = [];

class TrackStore extends EventEmitter {
	constructor() {
		super();
		this.registerAtDispatcher();
	}

	getTracks() {
		return _tracks;
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
					this.emitChange();
					break;
				}

        case TRACK_REMOVE: {
          _tracks.splice(action.index, 1);
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
