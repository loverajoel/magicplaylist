'use strict';

import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';
import {MODAL_OPEN, MODAL_CLOSE} from '../constants/constants';

let CHANGE_EVENT = 'change';

let _isOpen = false;

class SearchStore extends EventEmitter {
	constructor() {
		super();
		this.registerAtDispatcher();
	}

	isOpen() {
		return _isOpen;
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

			switch(action.type) {

        case MODAL_OPEN: {
					_isOpen = true;
					this.emitChange();
					break;
				}

        case MODAL_CLOSE: {
          _isOpen = false;
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

export default new SearchStore();
