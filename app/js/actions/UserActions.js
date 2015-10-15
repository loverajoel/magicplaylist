'use strict';

import Dispatcher from '../dispatcher';
import {USER_LOGED, USER_TOKEN, USER_LOGOUT} from '../constants/constants';
import Spotify from '../core/Spotify';

let UserActions = {

  login: () => {
    Spotify.login().then((data) => {
      Dispatcher.dispatch({
        type: USER_TOKEN,
        data: data
      });
      Spotify.getUser().then((data) => {
        Dispatcher.dispatch({
          type: USER_LOGED,
          data: data
        });
      });
    });
  }

};

export default UserActions;
