'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {close} from '../actions/ModalActions';
import {login} from '../actions/UserActions';
import {save} from '../actions/PlaylistActions';

import PlaylistStore from '../stores/PlaylistStore';
import UserStore from '../stores/UserStore';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playlistName: '',
      playlistPublic: true
    }
  }

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.playlistName).focus();
  }

  _handleClose() {
    close();
    ga('send', 'event', 'button', 'click', 'close-modal');
  }

  _savePlaylist() {
    const playlistName = ReactDOM.findDOMNode(this.refs.playlistName).value;
    if (playlistName.length > 3) {
      close();
      save(
        UserStore.getUser()._id,
        playlistName,
        this.state.playlistPublic, PlaylistStore.getTracks()
      );
    }
  }

  _handleSave() {
    if (this.props.token && this.props.user) {
      this._savePlaylist();
    } else {
      login().then(() => {
        this._savePlaylist();
      });
    }
    ga('send', 'event', 'button', 'click', 'playlist-save');
  }

  _handlePublic(status) {
    this.setState({
      playlistPublic: status
    })
  }

  render() {
    return <div className='modal'>
              <div className='modal-container'>
                  <div className='close-modal'><img src='img/close.svg' onClick={this._handleClose}/></div>
                  <div>
                      <input type='text' placeholder='Name' className='playlist-name' ref='playlistName'/>
                  </div>
                  <span className='status'>Playlist Status</span>
                  <div className='radio-container'>
                      <input id='true' type='radio' name='public' value='true' onChange={this._handlePublic.bind(this, true)} defaultChecked={true}/>
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
