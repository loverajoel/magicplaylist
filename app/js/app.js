'use strict';

import React, {Component} from 'react/addons';
import SearchBox from './components/SearchBox';
import Playlist from './components/Playlist';
import Top from './components/Top';
import Footer from './components/Footer';
import Title from './components/Title';
import SaveModal from './components/SaveModal';
import Loading from './components/Loading';
import SearchStore from './stores/SearchStore';
import TrackStore from './stores/TrackStore';
import ModalStore from './stores/ModalStore';
import UserStore from './stores/UserStore';

let ReactTransitionGroup = React.addons.CSSTransitionGroup;

let getAppState = () => {
  return {
    text: SearchStore.getSearch(),
    tracks: TrackStore.getTracks(),
    searching: SearchStore.getSearch() !== '',
    loading: TrackStore.getLoading(),
    user: UserStore.getUser(),
    token: UserStore.getToken(),
    modalOpen: ModalStore.isOpen()
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = getAppState();
  }

  componentDidMount() {
    SearchStore.addChangeListener(this._onChange.bind(this));
    TrackStore.addChangeListener(this._onChange.bind(this));
    ModalStore.addChangeListener(this._onChange.bind(this));
    UserStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange.bind(this));
    TrackStore.removeChangeListener(this._onChange.bind(this));
    ModalStore.removeChangeListener(this._onChange.bind(this));
    UserStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(getAppState());
  }

  render() {
  	return  <div className='container'>
              <ReactTransitionGroup transitionName='fade'>
                { this.state.searching ? <Top search={this.state.text}/> : null }
              </ReactTransitionGroup>
              <ReactTransitionGroup transitionName='fade'>
                { !this.state.searching ? <div className='search-container'><Title/><SearchBox/></div> : null }
              </ReactTransitionGroup>
              <ReactTransitionGroup transitionName='fade'>
                { this.state.searching && !this.state.loading ? <Playlist search={this.state.text} tracks={this.state.tracks}/> : null }
              </ReactTransitionGroup>
              <ReactTransitionGroup transitionName='fade'>
                { this.state.loading ? <Loading/> : null }
              </ReactTransitionGroup>
              <ReactTransitionGroup transitionName='fade'>
                { this.state.modalOpen ? <SaveModal user={this.state.user} token={this.state.token}/> : null }
              </ReactTransitionGroup>
              <Footer tracks={this.state.tracks}/>
            </div>
  }
}

React.render(
	<App/>,
  document.getElementById('container')
);
