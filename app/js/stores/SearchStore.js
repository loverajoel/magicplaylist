'use strict';

import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';
import {SEARCH_ADD, SEARCH_RESET} from '../constants/constants';

let CHANGE_EVENT = 'change';

let _currentSearch = '';

class SearchStore extends EventEmitter {
  constructor() {
    super();
    this.registerAtDispatcher();
  }

  getSearch() {
    return _currentSearch;
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
      const {type, text} = action;
      switch (type) {

        case SEARCH_ADD: {
          _currentSearch = text.id ? `${text.name}, ${text.artists.first().name}` : text;
          this.emitChange();
          break;
        }

        case SEARCH_RESET: {
          _currentSearch = '';
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
