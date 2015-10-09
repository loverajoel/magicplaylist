'use strict';

import Dispatcher from '../dispatcher';
import {SEARCH_ADD} from '../constants/constants';

export function newSearch(text) {
  const action = {
    type: SEARCH_ADD,
    text: text
  }
  Dispatcher.dispatch(action);
}
