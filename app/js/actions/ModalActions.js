'use strict';

import Dispatcher from '../dispatcher';
import {MODAL_OPEN, MODAL_CLOSE} from '../constants/constants';

let ModalActions = {

  open: () => {
    Dispatcher.dispatch({
      type: MODAL_OPEN
    });
  },

  close: () => {
    Dispatcher.dispatch({
      type: MODAL_CLOSE
    });
  }

};

export default ModalActions;
