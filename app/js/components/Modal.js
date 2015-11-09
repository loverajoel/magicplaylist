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
    };
  }

  componentDidMount() {
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
    if (this.props.token &&
        this.props.user &&
        Number(localStorage.magic_token_expires) > Date.now())
    {
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
    });
  }

  render() {
    return <div className='modal'>
              <div className='modal-container'>
                  <h1>Save playlist on Spotify</h1>
                  <div className='playlist-name-input'>
                    <input
                      type='text'
                      placeholder='Playlist Name'
                      className='playlist-name'
                      ref='playlistName'
                    />
                  </div>
                  <div className='playlist-status'>
                  <h3 className='status'>Playlist Status</h3>
                  <div className='radio-container'>
                    <input id='true'
                      type='radio'
                      name='public'
                      value='true'
                      onChange={this._handlePublic.bind(this, true)}
                      defaultChecked={true}
                    />
                    <label htmlFor='true'>Public</label>
                    <input
                      id='false'
                      type='radio'
                      name='public'
                      value='false'
                      onChange={this._handlePublic.bind(this, true)}
                    />
                    <label htmlFor='false'>Private</label>
                  </div>
                  </div>
                  <div className='buttons'>
                    <a className='close' href='#' onClick={this._handleClose}>Cancel</a>

                    <a
                      href='#'
                      className='save'
                      onClick={this._handleSave.bind(this)}
                    >Save playlist</a>
                  </div>
              </div>
         </div>;
  }
}

export default Modal;
