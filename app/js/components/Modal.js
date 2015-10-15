'use strict';

import React, {Component} from 'react';
import {close} from '../actions/ModalActions';
import {login} from '../actions/UserActions';
import TrackStore from './stores/TrackStore';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playlistName: '',
      playlistPublic: true
    }
  }

  _handleClose() {
    close();
  }

  _handleSave() {
    if (this.props.token && this.props.user) {
      const playlistName = React.findDOMNode(this.refs.playlistName).value;
      if (playlistName.length > 3) {
        save(playlistName, this.state.playlistPublic, TrackStore.getTracks());
      }
    } else {
      login();
    }
  }

  _handlePublic(status) {
    this.setState({
      playlistPublic: status
    })
  }

  render() {
    return <div className='modal'>
              <div className='modal-container'>
                  <div className='close-modal'><img src='style/close.svg' onClick={this._handleClose}/></div>
                  <div>
                      <input type='text' placeholder='Name' className='playlist-name' ref='playlistName'/>
                  </div>
                  <span className='status'>Playlist Status</span>
                  <div className='radio-container'>
                      <input id='true' type='radio' name='public' value='true' onChange={this._handlePublic.bind(this, true)}/>
                      <label htmlFor='true'>Public</label>
                      <input id='false' type='radio' name='public' value='false' onChange={this._handlePublic.bind(this, true)}/>
                      <label htmlFor='false'>Private</label>
                  </div>

                  <div>
                      <button className='save' type='button' onClick={this._handleSave.bind(this)}>Save Playlist</button>
                  </div>
              </div>
         </div>
  }
}

export default Modal;
