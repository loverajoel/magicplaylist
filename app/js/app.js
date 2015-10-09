import React, {Component} from 'react';
import SearchBox from './components/SearchBox';
import Tracks from './components/Tracks';
import Top from './components/Top';
import Title from './components/Title';
import PlaylistModal from './components/PlaylistModal';
import Loading from './components/Loading';
import SearchStore from './stores/SearchStore';
import TrackStore from './stores/TrackStore';

let getAppState = () => {
  return {
    text: SearchStore.getSearch(),
    tracks: TrackStore.getTracks(),
    searching: SearchStore.getSearch() !== '',
    loading: false,
    user: localStorage.user,
    token: localStorage.token,
    modalOpen: false
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
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange.bind(this));
    TrackStore.addChangeListener(this._onChange.bind(this));
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
              { this.state.modalOpen ? <PlaylistModal close={this.close.bind(this)} save={this.savePlaylist.bind(this)}/> : null }
             </div>
  }
}

React.render(
	<App/>,
  document.getElementById('container')
);
