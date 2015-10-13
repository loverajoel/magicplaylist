'use strict';

import Dispatcher from '../dispatcher';
import {SEARCH_ADD, SEARCH_REMOVE} from '../constants/constants';

let SearchActions = {

  newSearch: (text) => {
    Dispatcher.dispatch({
      type: SEARCH_ADD,
      text: text
    });
  },

  removeSearch: () => {
    Dispatcher.dispatch({
      type: SEARCH_REMOVE
    });
  }

};

export default SearchActions;
