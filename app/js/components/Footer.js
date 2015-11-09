'use strict';

import React, {Component} from 'react';

class Footer extends Component {

  constructor(props) {
    super(props);
  }

  _handleClick(text) {
    ga('send', 'event', 'button', 'footer', text);
  }

  render() {
    let style = !this.props.tracks ? 'footer fixed' : 'footer';
    return <div className={style}>
              <div className='copy'><p>
                Developed by <a
                  href='https://github.com/loverajoel'
                  target='_blank'
                  onClick={this._handleClick.bind(this, '@loverajoel')}
                >@loverajoel
                </a> / Designed by <a
                  href='https://dribbble.com/curva'
                  target='_blank'
                  onClick={this._handleClick.bind(this, '@aschelstraete')}>@aschelstraete
                  </a> / <a
                  href='https://github.com/loverajoel/magicplaylist'
                  onClick={this._handleClick.bind(this, 'github')}
                  target='_blank'
                >Source Code
                </a> / <a
                  href='https://twitter.com/magicplaylistco'
                  onClick={this._handleClick.bind(this, 'twitter')}
                  target='_blank'>@magicplaylistco</a>
              </p></div>
              <div className='spotify-api'><p>Created using the API of <a
                href='https://developer.spotify.com/web-api/'
                target='_blank'></a></p>
              </div>
            </div>;
  }
}

export default Footer;
