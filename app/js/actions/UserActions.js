'use strict';

import Dispatcher from '../dispatcher';
import {USER_LOGED, USER_TOKEN, USER_LOGOUT, USER_COUNTRY} from '../constants/constants';
import Spotify from '../core/Spotify';

let UserActions = {

  login: () => {
    ga('send', 'event', 'event', 'login', 'init');
    return new Promise((resolve, reject) => {
      Spotify.login().then((data) => {
        Dispatcher.dispatch({
          type: USER_TOKEN,
          data: data
        });
        ga('send', 'event', 'event', 'login', 'fin');
        Spotify.getUser().then((data) => {
          Dispatcher.dispatch({
            type: USER_LOGED,
            data: data
          });
          resolve();
        });
      });
    });
  },

  getCountry: () => {
    let checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }

    let parseJSON = (response) => {
        return response.json();
    }

    fetch('http://ip-api.com/json', {
        method: 'GET'
    }).then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      Dispatcher.dispatch({
        type: USER_COUNTRY,
        data: response.countryCode
      });
    });
  }

};

export default UserActions;
