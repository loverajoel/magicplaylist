'use strict';

import React, {Component} from 'react';
import {removeSearch} from '../actions/SearchActions';
import {open} from '../actions/ModalActions';

class Top extends Component {

  constructor(props) {
      super(props);
  }

  _handleClose() {
    removeSearch();
  }

  _handleSave() {
    open();
  }

  render() {
    return <div className='top'>
                <div className='close' onClick={this._handleClose}>X</div>
                <div className='search'><span>{this.props.text}</span></div>
                <div className='save' onClick={this._handleSave}>Save Playlist</div>
            </div>
  }
}

export default Top;
