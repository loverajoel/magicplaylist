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
    if (localStorage.magic_country) {
      Dispatcher.dispatch({
        type: USER_COUNTRY,
        data: localStorage.magic_country
      });
    } else {
      let checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      };

      let parseJSON = (response) => {
        return response.json();
      };

      fetch('http://ip-api.com/json', {
        method: 'GET'
      }).then(checkStatus)
      .then(parseJSON)
      .then((response) => {

        let markets = ['AD','AR','AT','AU','BE','BG','BO','BR','CA','CH','CL','CO','CR','CY','CZ',
        'DE','DK','DO','EC','EE','ES','FI','FR','GB','GR','GT','HK','HN','HU','IE','IS','IT','LI',
        'LT','LU','LV','MC','MT','MX','MY','NI','NL','NO','NZ','PA','PE','PH','PL','PT','PY','RO',
        'SE','SG','SI','SK','SV','TR','TW','US','UY'];

        if (markets.indexOf(response.countryCode) > -1) {
          localStorage.magic_country = response.countryCode;
          Dispatcher.dispatch({
            type: USER_COUNTRY,
            data: response.countryCode
          });
        } else {
          localStorage.magic_country = 'US';
          Dispatcher.dispatch({
            type: USER_COUNTRY,
            data: 'US'
          });
        }
      }).catch((error) => {
        ga('send', 'event', 'event', 'error-country', 'catch');
      });
    }
  }
};

export default UserActions;
