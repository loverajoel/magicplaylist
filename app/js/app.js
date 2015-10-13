import React, {Component} from 'react';
import SearchBox from './components/SearchBox';
import Tracks from './components/Tracks';
import Top from './components/Top';
import Title from './components/Title';
import PlaylistModal from './components/PlaylistModal';
import Loading from './components/Loading';
import SearchStore from './stores/SearchStore';
import TrackStore from './stores/TrackStore';
import ModalStore from './stores/ModalStore';
import UserStore from './stores/UserStore';

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
  	return  <div>
              { this.state.searching ? <Top text={this.state.text}/> : null }
              { !this.state.searching ? <Title/> : null }
              { !this.state.searching ? <SearchBox/> : null }
              { this.state.searching ? <Tracks search={this.state.text} tracks={this.state.tracks}/> : null }
              { this.state.loading ? <Loading/> : null }
              { this.state.modalOpen ? <PlaylistModal user={this.state.user} token={this.state.token}/> : null }
             </div>
  }
}

React.render(
	<App/>,
  document.getElementById('container')
);
