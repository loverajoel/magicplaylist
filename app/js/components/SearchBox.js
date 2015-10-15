'use strict';

import React, {Component} from 'react';
import {newSearch} from '../actions/SearchActions';
import TrackActions from '../actions/TrackActions';

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialValue: this.props.value
    }
  }

  _handleSearch() {
    const text = React.findDOMNode(this.refs.searchInput).value;
    newSearch(text);
    TrackActions.search(text);
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
                      <div className='btn-search' onClick={this._handleSearch.bind(this)}>
                        <img src='style/search.svg'/>
                      </div>
                  </span>
                  <input type='text' ref='searchInput' className='input-search' placeholder='What is your favorite song?' onKeyPress={this._handleKeyPress.bind(this)} defaultValue={this.state.initialValue}/>
              </div>
            </div>
  }
}

export default SearchBox;
