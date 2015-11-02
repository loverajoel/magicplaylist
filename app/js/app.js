'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SearchBox from './components/SearchBox';
import Playlist from './components/Playlist';
import Top from './components/Top';
import Footer from './components/Footer';
import Title from './components/Title';
import Modal from './components/Modal';
import Loading from './components/Loading';
import Alert from './components/Alert';
import Tip from './components/Tip';

import SearchStore from './stores/SearchStore';
import PlaylistStore from './stores/PlaylistStore';
import ModalStore from './stores/ModalStore';
import UserStore from './stores/UserStore';
import AlertStore from './stores/AlertStore';

import {getCountry} from './actions/UserActions';

let getAppState = () => {
  return {
    text: SearchStore.getSearch(),
    tracks: PlaylistStore.getTracks(),
    mainTrack: PlaylistStore.getMainTrack(),
    searching: SearchStore.getSearch() !== '',
    loading: PlaylistStore.getLoading(),
    user: UserStore.getUser(),
    token: UserStore.getToken(),
    modalOpen: ModalStore.isOpen(),
    alertOpen: AlertStore.isOpen(),
    alert: AlertStore.status(),
    country: UserStore.getCountry(),
    lastPlaylist: PlaylistStore.getLastPlaylist()
  };
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = getAppState();
  }

  componentDidMount() {
    getCountry();
    SearchStore.addChangeListener(this._onChange.bind(this));
    PlaylistStore.addChangeListener(this._onChange.bind(this));
    ModalStore.addChangeListener(this._onChange.bind(this));
    UserStore.addChangeListener(this._onChange.bind(this));
    AlertStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange.bind(this));
    TrackStore.removeChangeListener(this._onChange.bind(this));
    ModalStore.removeChangeListener(this._onChange.bind(this));
    UserStore.removeChangeListener(this._onChange.bind(this));
    AlertStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(getAppState());
  }

  render() {
    return <div className={'container search-state-' + this.state.searching}>
              { this.renderSearch() }
              <ReactCSSTransitionGroup transitionName='fade'>
              { this.state.searching && !this.state.loading ? this.renderPlaylist() : null }
              </ReactCSSTransitionGroup>
              <ReactCSSTransitionGroup transitionName='fade'>
              { this.state.loading ? <Loading/> : null }
              </ReactCSSTransitionGroup>
              <ReactCSSTransitionGroup transitionName='fade'>
              { this.state.modalOpen ? this.renderModal() : null }
              </ReactCSSTransitionGroup>
              <ReactCSSTransitionGroup transitionName='fade' >
              { this.state.alertOpen ? this.renderAlert() : null }
              </ReactCSSTransitionGroup>
              <Footer tracks={this.state.tracks.length}/>
            </div>;
  }

  renderSearch() {
    return <span><div className='search-container'>
            <Title/>
            <SearchBox country={this.state.country}/>
            <Tip/>
            </div></span>;
  }

  renderPlaylist() {
    return <Playlist mainTrack={this.state.mainTrack} tracks={this.state.tracks}/>;
  }

  renderModal() {
    return <Modal user={this.state.user} token={this.state.token}/>;
  }

  renderAlert() {
    return <Alert
              username={this.state.user ? this.state.user._display_name : null}
              status={this.state.alert}
              lastPlaylist={this.state.lastPlaylist}
            />;
  }
}

ReactDOM.render(
	<App/>,
  document.getElementById('container')
);
