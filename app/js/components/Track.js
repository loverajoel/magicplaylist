'use strict';

import React, {Component} from 'react';
import PlaylistActions from '../actions/PlaylistActions';

class Track extends Component {

  constructor(props) {
    super(props);
  }

  _remove() {
    PlaylistActions.removeTrack(this.props.index);
  }

  render() {
    let track = this.props.track;
    return  <li key={track.id}>
              {track.name}, {track.artists.first().name}
              <div className='remove' onClick={this._remove.bind(this)}>
                <img src='img/remove.svg'/>
              </div>
              <div className='play' onClick=''>
                <img src='img/volume.svg'/>
              </div>
            </li>
  }
}

export default Track;
