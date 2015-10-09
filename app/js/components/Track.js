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
    return <li key={track.id}>{track.name}, {track.artists.first().name} <span className='remove' onClick={this._remove.bind(this)}>x</span></li>
  }
}

export default Track;
