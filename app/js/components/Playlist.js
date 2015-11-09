'use strict';

import React, {Component} from 'react';
import Track from './track';
import {open} from '../actions/ModalActions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Playlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      audios: []
    };
  }

  _handleSave() {
    open();
    ga('send', 'event', 'button', 'click', 'open-modal-save-playlist');
  }

  _add(elem) {
    this.state.audios.push(elem);
  }

  _stopAll() {
    this.state.audios.map((item) => {
      item.pause();
    });
  }

  render() {
    var tracks = this.props.tracks.map((track, i) => {
      return <Track
                track={track}
                key={'track_' + track._id}
                index={i}
                ptag={this._add.bind(this)}
                stopAll={this._stopAll.bind(this)}
              />;
    });
    return <div className='playlist'>
              <div className='info'>
                { !this.props.tracks.length ?
                  <h2 className='track-name'>Hey! The track doesn't exist! :(</h2> : null
                }
                { this.props.mainTrack ?
                  <h2 className='track-name'>
                      {this.props.mainTrack.name}
                    , {this.props.mainTrack.artists.first().name}
                  </h2> :  null
                }
                { this.props.tracks.length ?
                  <a href='#' className='save-playlist' onClick={this._handleSave}>
                    Save playlist on Spotify
                  </a> : null
                }
              </div>
              <ul className='tracklist'>
              <ReactCSSTransitionGroup
                transitionName='fadeList'
                transitionEnterTimeout={0}
                transitionLeaveTimeout={0}
              >
                {tracks}
              </ReactCSSTransitionGroup>
              </ul>
            </div>;
  }
}

export default Playlist;
