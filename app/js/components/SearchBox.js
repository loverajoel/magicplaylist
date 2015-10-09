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

  render() {
    return  <div className='search-box'>
              <div className='search-group'>
                  <span className='input-group-btn'>
                      <button className='btn-search' type='button' onClick={this._handleSearch.bind(this)}>Go!</button>
                  </span>
                  <input type='text' ref='searchInput' className='input-search' placeholder='ej: The pretender, Foo Fighters'/>
              </div>
            </div>
  }
}

export default SearchBox;
