'use strict';

import React, {Component} from 'react';
import Track from './track';
import TrackActions from '../actions/TrackActions';

class Tracks extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    TrackActions.search(this.props.search);
  }

  render() {
    var tracks = this.props.tracks.map((track, i)=>{
        return <Track track={track} index={i}/>
    });
    return  <ul className='trackList'>
                {tracks}
            </ul>
  }
}

export default Tracks;
