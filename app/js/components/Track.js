'use strict';

import React, {Component} from 'react';
import TrackActions from '../actions/TrackActions';

class Track extends Component {

  constructor(props) {
    super(props);
  }

  _remove() {
    TrackActions.removeTrack(this.props.index);
  }

  render() {
    let track = this.props.track;
    return  <li key={track.id}>
              {track.name}, {track.artists.first().name}
              <div className='remove' onClick={this._remove.bind(this)}>
                <img src='style/remove.svg'/>
              </div>
              <div className='play' onClick=''>
                <img src='style/volume.svg'/>
              </div>
            </li>
  }
}

export default Track;
