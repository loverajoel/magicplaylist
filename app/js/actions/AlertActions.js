'use strict';

import Dispatcher from '../dispatcher';
import {ALERT_OPEN, ALERT_CLOSE} from '../constants/constants';

let AlertActions = {

  open: () => {
    Dispatcher.dispatch({
      type: ALERT_OPEN
    });
  },

  close: () => {
    Dispatcher.dispatch({
      type: ALERT_CLOSE
    });
  }

};

export default AlertActions;
