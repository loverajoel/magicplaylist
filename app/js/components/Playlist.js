'use strict';

import React, {Component} from 'react';
import Track from './track';
import {open} from '../actions/ModalActions';

class Playlist extends Component {

  constructor(props) {
    super(props);
  }

  _handleSave() {
    open();
  }

  render() {
    var tracks = this.props.tracks.map((track, i)=>{
        return <Track track={track} index={i}/>
    });
    return  <div className='playlist'>
              <div className='info'>
                <div className='track-name'>{this.props.mainTrack.name}, {this.props.mainTrack.artists.first().name}</div>
                <div className='save-playlist' onClick={this._handleSave}>Save Playlist on Spotify</div>
              </div>
              {tracks.length ? <span>No tracks</span> : null}
              <ul className='trackList'>
                  {tracks}
              </ul>
            </div>
  }
}

export default Playlist;
