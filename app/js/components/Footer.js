'use strict';

import React, {Component} from 'react';

class Footer extends Component {

  constructor(props) {
      super(props);
  }

  render() {
    let style = !this.props.tracks ? 'footer fixed' : 'footer';
    return  <div className={style}>
              <div className='copy'>Developed by <a href='#'>Joel Lovera</a> / Designed by <a href='#'>Agustin Schelstraete</a> / <a href='#'>Source Code</a></div>
              <div className='spotify-api'>Created using the API of <img src='img/spotify-logo.png'/></div>
            </div>
  }
}

export default Footer;
