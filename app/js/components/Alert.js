'use strict';

import React, {Component} from 'react';
import {close} from '../actions/AlertActions';

class Alert extends Component {

  constructor(props) {
    super(props);
    this.share = {
      text: 'Demo Share',
      url: 'demo.com',
      image: 'none'
    }
  }

  _handleDone() {
    close();
  }

  _hanbleShareFB() {
    let url = `http://facebook.com/sharer.php?s=100&p[url]=${this.share.url}&p[images][0]=
    ${this.share.image}&p[title]=${this.share.text}`;
    open(
      url,
      'fbshare',
      'height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0'
      );
  }

  _hanbleShareTW() {
    let url = `http://twitter.com/share?url=${this.share.url}&text=${this.share.text}`;
    open(
      url,
      'tshare',
      'height=400,width=550,resizable=1,toolbar=0,menubar=0,status=0,location=0'
      );
  }

  render() {
    var share = <div className='alert-share'>
                  <span className='share-title'>High Five {this.props.username}!</span>
                  <span className='share-subtitle'>Your playlist is now on Spotify</span>
                  <span className='share-message'>Now share it with your friends</span>
                  <div className='share'>
                    <div className='facebook source' onClick={this._hanbleShareFB}>
                      <img src='img/facebook.svg'/>
                    </div>
                    <div className='twitter source' onClick={this._hanbleShareTW}>
                      <img src='img/twitter.svg'/>
                    </div>
                  </div>
                  <div className='btn-done' onClick={this._handleDone}>Im done, Thanks!</div>
                </div>;
    return  <div className='alert-shadow'>
              <div className='alert-modal'>
                {this.props.loading ? <div className='alert-loading'><img src='img/tail-spin.svg'/></div> : null}
                {this.props.fail ? <div className='alert-fail'>fail</div> : null}
                {this.props.share ? share : null}
              </div>
            </div>
  }
}

export default Alert;
