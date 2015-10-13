'use strict';

import Dispatcher from '../dispatcher';
import {USER_LOGIN, USER_TOKEN} from '../constants/constants';

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
