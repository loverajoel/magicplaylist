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
                country={this.props.country}
              />;
    });
    return <div className='playlist'>
              <div className='info'>
                { !this.props.tracks.length ?
                  <div className='track-name'>Hey! The track doesn't exist! :(</div> : null
                }
                { this.props.mainTrack ?
                  <div className='track-name'>
                    <strong>
                      {this.props.mainTrack.name}
                    </strong>, {this.props.mainTrack.artists.first().name}
                  </div> :  null
                }
                { this.props.tracks.length ?
                  <div className='save-playlist' onClick={this._handleSave}>
                    Save playlist on Spotify
                  </div> : null
                }
              </div>
              <ul className='trackList'>
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
