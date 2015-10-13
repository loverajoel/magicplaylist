'use strict';

import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';
import {USER_LOGED, USER_TOKEN, USER_LOGOUT} from '../constants/constants';

let CHANGE_EVENT = 'change';

let _user = JSON.parse(localStorage.getItem('magic_user')) || null;
let _token = localStorage.getItem('magic_token') || null;

class SearchStore extends EventEmitter {
	constructor() {
		super();
		this.registerAtDispatcher();
	}

	getUser() {
		return _user;
	}

  getToken() {
    return _token;
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

        case USER_LOGED: {
					_user = action.data;
					this.emitChange();
					break;
				}

        case USER_TOKEN: {
          _token = action.token;
          this.emitChange();
          break;
        }

        case USER_LOGOUT: {
          _user = null;
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
