'use strict';

import React, {Component} from 'react';
import PlaylistActions from '../actions/PlaylistActions';
import Player from './Player';

class Track extends Component {

  constructor(props) {
    super(props);
  }

  _remove() {
    PlaylistActions.removeTrack(this.props.index);
    ga('send', 'event', 'button', 'click', 'playlist-remove-track');
  }

  render() {
    let track = this.props.track;
    return  <li>
              <div className='track-name'>{track.name}, <b>{track.artists.first().name}</b></div>
              <div className='remove' onClick={this._remove.bind(this)}>
                <img src='img/remove.svg'/>
              </div>
              <div className='play'>
                <Player
                  source={track.preview_url}
                  ptag={this.props.ptag.bind(this)}
                  stopAll={this.props.stopAll.bind(this)}/>
              </div>
            </li>
  }
}

export default Track;
