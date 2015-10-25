'use strict';

import React, {Component} from 'react';
import {resetSearch} from '../actions/SearchActions';
import SearchBox from './SearchBox';

class Top extends Component {

  constructor(props) {
    super(props);
  }

  _handleTitle() {
    resetSearch();
  }

  render() {
    return <div className='top'>
                <div className='title' onClick={this._handleTitle}>
                  <span><strong>Magic</strong>Playlist /</span>
                </div>
                <div className='search'>
                  <SearchBox value={this.props.search} country={this.props.country}/>
                  </div>
            </div>;
  }
}

export default Top;
