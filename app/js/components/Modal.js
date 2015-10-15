'use strict';

import React, {Component} from 'react';
import {close} from '../actions/ModalActions';
import {login} from '../actions/UserActions';

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
      console.log('guardar')
      // const playlistName = React.findDOMNode(this.refs.playlistName).value;
      // if (playlistName.length > 3) {
      // console.log(text)
      // save(text);
      // }
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
              <div className="modal-container">
                  <div>
                      <input type='text' placeholder='Name' className='playlist-name' ref='playlistName'/>
                  </div>
                  <div>
                      <input type='radio' name='public' value='true' onChange={this._handlePublic.bind(this, true)} checked='true'/>Public
                      <input type='radio' name='public' value='false' onChange={this._handlePublic.bind(this, false)}/>Private
                  </div>

                  <div>
                      <button className='save' type='button' onClick={this._handleSave.bind(this)}>Save</button>
                  </div>
              </div>
         </div>
  }
}

export default Modal;
