'use strict';

import React, {Component} from 'react';
import {newSearch} from '../actions/SearchActions';

class SearchBox extends Component {

  constructor(props) {
    super(props);
  }

  _handleSearch() {
    const text = React.findDOMNode(this.refs.searchInput).value;
    newSearch(text);
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this._handleSearch();
    }
  }

  render() {
    return  <div className='search-box'>
              <div className='search-group'>
                  <span className='input-group-btn'>
                      <div className='btn-search' onClick={this._handleSearch.bind(this)}></div>
                  </span>
                  <input type='text' ref='searchInput' className='input-search' placeholder='Type an artist or a song to start' onKeyPress={this._handleKeyPress.bind(this)} value={this.props.value}/>
              </div>
            </div>
  }
}

export default SearchBox;
