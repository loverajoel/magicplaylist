'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {newSearch} from '../actions/SearchActions';
import PlaylistActions from '../actions/PlaylistActions';

import Spotify from '../core/Spotify';

import Autosuggest from 'react-autosuggest';

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
    const text = document.querySelector('#search-input').value;
    if (text.length > 3) {
      this._search(text);
      ga('send', 'event', 'button', 'click', 'search-box-input');
    }
  }

  _handleKeyPress(event) {
    if (event.key === 'Enter') {
      const text = event.target.value;
      if (text.length > 3) {
        this._search(text);
        ga('send', 'event', 'key', 'press', 'search-box-enter');
      }
    }
  }

  render() {
    let time;
    function getSuggestions(input, callback) {
      if (time) {
        clearTimeout(time);
      }
      time = setTimeout(() => {
        Spotify.autocomplete(input, 'AR').then((tracks) => {
          callback(null, tracks);
        });
      }, 500);
    }

    function suggestionRenderer(track) {
      return <span>{track.name}, {track.artists.first().name}</span>;
    }

    function getSuggestionValue(track) {
      return `${track.name}, ${track.artists.first().name}`;
    }

    function showWhen(input) {
      return input.trim().length > 3;
    }

    function onSuggestionSelected(suggestion) {
      this._search(suggestion);
    }

    const inputAttributes = {
      id: 'search-input',
      type: 'text',
      ref: 'searchInput',
      className: 'input-search',
      placeholder: 'What is your favorite song?',
      onKeyPress: this._handleKeyPress.bind(this)
    };

    return <div className='search-box'>
            <div className='search-group'>
              <span className='input-group-btn'>
                <div className='btn-search' onClick={this._handleSearch.bind(this)}>
                  <img src='img/search.svg'/>
                </div>
              </span>
              <Autosuggest
                suggestions={getSuggestions}
                onSuggestionSelected={onSuggestionSelected.bind(this)}
                inputAttributes={inputAttributes}
                defaultValue={this.state.initialValue}
                suggestionRenderer={suggestionRenderer}
                suggestionValue={getSuggestionValue}
                showWhen={showWhen}
                cache={true}
              />
            </div>
          </div>;
  }

}

export default SearchBox;
