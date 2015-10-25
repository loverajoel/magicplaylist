'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {newSearch} from '../actions/SearchActions';
import PlaylistActions from '../actions/PlaylistActions';

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialValue: this.props.value
    };
  }

  _search(text) {
    newSearch(text);
    PlaylistActions.search(text, this.props.country);
    ga('send', 'event', 'event', 'new-search', text);
  }

  _handleSearch() {
    const text = ReactDOM.findDOMNode(this.refs.searchInput).value;
    if (text.length > 3) {
      this._search(text);
      ga('send', 'event', 'button', 'click', 'search-box-input');
    }
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      const text = ReactDOM.findDOMNode(this.refs.searchInput).value;
      if (text.length > 3) {
        this._search(text);
        ga('send', 'event', 'key', 'press', 'search-box-enter');
      }
    }
  }

  _handleFocus() {
    const input = ReactDOM.findDOMNode(this.refs.searchInput);
    input.setSelectionRange(0, input.value.length);
  }

  render() {
    return <div className='search-box'>
              <div className='search-group'>
                  <span className='input-group-btn'>
                      <div className='btn-search' onClick={this._handleSearch.bind(this)}>
                        <img src='img/search.svg'/>
                      </div>
                  </span>
                  <input
                    type='text'
                    ref='searchInput'
                    className='input-search'
                    placeholder='What is your favorite song?'
                    onKeyPress={this._handleKeyPress.bind(this)}
                    defaultValue={this.state.initialValue}
                    onFocus={this._handleFocus.bind(this)}/>
                    <div className='tip'>
                      <span>Tip: Type a song + artist for better results.</span>
                      <span>(ex: Triller, Michael Jackson)</span>
                    </div>
              </div>
            </div>;
  }
}

export default SearchBox;
