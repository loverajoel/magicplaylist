'use strict';

import React, {Component} from 'react';
import Track from './track';
import {open} from '../actions/ModalActions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PlaylistStore from '../stores/PlaylistStore';
import PlaylistActions from '../actions/PlaylistActions';
import { PLAYLIST_DEFAULT_SIZE } from '../constants/constants';

class Playlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      audios: [],
      trackCount: PlaylistStore.getPlaylistLength()
    };
  }

  _handleSave() {
    open();
    ga('send', 'event', 'button', 'click', 'open-modal-save-playlist');
  }

  _handle10More() {
      const trackName = this.props.mainTrack.name;
      const country = this.props.country;
      const totalTracks = PlaylistStore.getTracks().length;
      const newPlaylistLength = this.state.trackCount + 10;

      if (newPlaylistLength > totalTracks) {
        PlaylistActions.search(trackName, country, newPlaylistLength);
      } else {
        const newTrackCount = this.state.trackCount + 10;
        this.setState({ 'trackCount': newTrackCount });
      }
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
    var trackCount = this.state.trackCount;
    var firstTracks = this.props.tracks.slice(0, trackCount + 1);
    var tracks = firstTracks.map((track, i) => {
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
                { this.props.tracks.length ?
                  <li className='add-more-songs' onClick={this._handle10More.bind(this)}>
                    <span className='add-more-songs-text'>+10 please!</span>
                  </li> : null
                }
              </ReactCSSTransitionGroup>
              </ul>

            </div>;
  }
}

export default Playlist;
