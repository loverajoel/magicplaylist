import React, {Component} from 'react';

class Title extends Component {

  constructor(props) {
      super(props);
  }

  render() {
    return  <div className='title auto-hidden'>
              <h1><b>Magic</b>Playlist /</h1>
              <h3>Get the playlist of your dreams based on a song.</h3>
            </div>
  }
}

export default Title;
