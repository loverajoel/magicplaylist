'use strict';

import React, {Component} from 'react';
import Track from './track';
import {open} from '../actions/ModalActions';

class Playlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      audios: []
    }
  }

  _handleSave() {
    open();
  }

  _add(elem) {
    this.state.audios.push(elem)
  }

  _stopAll() {
    this.state.audios.map((item) => {
      item.pause();
    });
  }

  render() {
    var tracks = this.props.tracks.map((track, i)=>{
        return <Track track={track} index={i} key={'track_'+track._id+i} ptag={this._add.bind(this)} stopAll={this._stopAll.bind(this)}/>
    });
    return  <div className='playlist'>
              <div className='info'>
                <div className='track-name'>{this.props.mainTrack.name}, {this.props.mainTrack.artists.first().name}</div>
                <div className='save-playlist' onClick={this._handleSave}>Save Playlist on Spotify</div>
              </div>
              {!this.props.tracks.length ? <span>No tracks</span> : null}
              <ul className='trackList'>
                  {tracks}
              </ul>
            </div>
  }
}

export default Playlist;
