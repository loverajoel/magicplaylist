'use strict';

import React, {Component} from 'react';
import {close} from '../actions/AlertActions';

class Alert extends Component {

  constructor(props) {
    super(props);
    if (this.props.fail) {
      setTimeout(() => {
        close();
      }, 3000);
    }
  }

  _handleDone() {
    close();
    ga('send', 'event', 'button', 'click', 'alert-close');
  }

  _hanbleShareFB() {
    let url = `http://facebook.com/sharer.php?s=100&p[url]=http://www.magicplaylist.co`;
    open(
      url,
      'fbshare',
      'height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0'
      );
    ga('send', 'event', 'button', 'click', 'share-fb');
  }

  _hanbleShareTW() {
    let url = `https://twitter.com/intent/tweet?text=Listen the playlist that I just created
    ${this.props.lastPlaylist}. Create yours in http://www.magicplaylist.co&hashtags=magicPlaylist`
    open(
      url,
      'tshare',
      'height=400,width=550,resizable=1,toolbar=0,menubar=0,status=0,location=0'
      );
    ga('send', 'event', 'button', 'click', 'share-tw');
  }

  render() {
    var share = <div className='alert-share'>
                  <span className='share-title'>High Five {this.props.username}!</span>
                  <span className='share-subtitle'>Your playlist is now on Spotify <a href={this.props.lastPlaylist} target="_blank">Go for it</a></span>
                  <span className='share-message'>Now share it with your friends</span>
                  <div className='share'>
                    <div className='facebook source' onClick={this._hanbleShareFB.bind(this)}>
                      <img src='img/facebook.svg'/>
                    </div>
                    <div className='twitter source' onClick={this._hanbleShareTW.bind(this)}>
                      <img src='img/twitter.svg'/>
                    </div>
                  </div>
                  <div className='btn-done' onClick={this._handleDone}>Im done, Thanks!</div>
                </div>;
    return  <div className='alert-shadow'>
              <div className='alert-modal'>
                {this.props.loading ? <div className='alert-loading'><img src='img/audio.svg'/></div> : null}
                {this.props.fail ? <div className='alert-fail'><span>opss! error!</span><img src='img/fail.svg'/></div> : null}
                {this.props.share ? share : null}
              </div>
            </div>
  }
}

export default Alert;
