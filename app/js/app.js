'use strict';

import React, {Component} from 'react/addons';

import SearchBox from './components/SearchBox';
import Playlist from './components/Playlist';
import Top from './components/Top';
import Footer from './components/Footer';
import Title from './components/Title';
import Modal from './components/Modal';
import Loading from './components/Loading';
import Alert from './components/Alert';

import SearchStore from './stores/SearchStore';
import PlaylistStore from './stores/PlaylistStore';
import ModalStore from './stores/ModalStore';
import UserStore from './stores/UserStore';
import AlertStore from './stores/AlertStore';

let ReactTransitionGroup = React.addons.CSSTransitionGroup;

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
    alert: AlertStore.status()
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = getAppState();
  }

  componentDidMount() {
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
  	return  <div className='container'>
              <ReactTransitionGroup transitionName='fade'>
                { this.state.searching ? <Top search={this.state.text}/> : null }
              </ReactTransitionGroup>
              <ReactTransitionGroup transitionName='fade-up'>
                { !this.state.searching ? <div className='search-container'><Title/><SearchBox/></div> : null }
              </ReactTransitionGroup>
              <ReactTransitionGroup transitionName='fade'>
                { this.state.searching && !this.state.loading ? <Playlist mainTrack={this.state.mainTrack} tracks={this.state.tracks}/> : null }
              </ReactTransitionGroup>
              <ReactTransitionGroup transitionName='fade'>
                { this.state.loading ? <Loading/> : null }
              </ReactTransitionGroup>
              <ReactTransitionGroup transitionName='fade'>
                { this.state.modalOpen ? <Modal user={this.state.user} token={this.state.token}/> : null }
              </ReactTransitionGroup>
              <ReactTransitionGroup transitionName='fade'>
                { this.state.alertOpen ? <Alert loading={this.state.alert.loading} fail={this.state.alert.fail} share={this.state.alert.share}/> : null }
              </ReactTransitionGroup>
              <Footer tracks={this.state.tracks.length}/>
            </div>
  }
}

React.render(
	<App/>,
  document.getElementById('container')
);
