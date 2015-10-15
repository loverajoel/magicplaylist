'use strict';

import React, {Component} from 'react';

class Alert extends Component {

  constructor(props) {
    super(props);
  }

  _handleDone() {

  }

  render() {
    return  <div className='alert-shadow'>
              <div className='alert-modal'>
                <div className='alert-loading'>loading</div>
                <div className='alert-fail'>fail</div>
                <div className='alert-share'>
                  <span className='share-title'>High Five Joel!</span>
                  <span className='share-subtitle'>Your playlist is now on Spotify</span>
                  <span className='share-message'>Now share it with your friends</span>
                  <div className='share'>
                    <div className='facebook source'>
                      <img src='style/facebook.svg'/>
                    </div>
                    <div className='twitter source'>
                      <img src='style/twitter.svg'/>
                    </div>
                  </div>
                  <div className='btn-done' onClick={this._handleDone}>Im done, Thanks!</div>
                </div>
              </div>
            </div>
  }
}

export default Alert;
