'use strict';

import React, {Component} from 'react';
import {close} from '../actions/AlertActions';

class Alert extends Component {

  constructor(props) {
    super(props);
  }

  _handleDone() {
    close();
  }

  render() {
    var share = <div className='alert-share'>
                  <span className='share-title'>High Five {this.props.username}!</span>
                  <span className='share-subtitle'>Your playlist is now on Spotify</span>
                  <span className='share-message'>Now share it with your friends</span>
                  <div className='share'>
                    <div className='facebook source'>
                      <img src='img/facebook.svg'/>
                    </div>
                    <div className='twitter source'>
                      <img src='img/twitter.svg'/>
                    </div>
                  </div>
                  <div className='btn-done' onClick={this._handleDone}>Im done, Thanks!</div>
                </div>;
    return  <div className='alert-shadow'>
              <div className='alert-modal'>
                {this.props.loading ? <div className='alert-loading'>loading</div> : null}
                {this.props.fail ? <div className='alert-fail'>fail</div> : null}
                {this.props.share ? share : null}
              </div>
            </div>
  }
}

export default Alert;
