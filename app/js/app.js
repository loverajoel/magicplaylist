import React from 'react';
import {TabbedArea, TabPane} from 'react-bootstrap';
import SearchSection from './sections/searchSection';
import PlaylistSection from './sections/playlistSection';
import {Client, TrackHandler, UserHandler} from 'spotify-js';

let client = Client.instance;

client.settings = {
	clientId: '27b1f3cdbe3a47108eb2b8c969e27e4e', 
	secretId: '206fc8944cdb42bf9b84af7341e3c996',
	scopes: 'user-read-private playlist-read-collaborative playlist-modify-public',
	redirect_uri: 'http://localhost:3000/app/'
};

let track = new TrackHandler();
let user = new UserHandler();

let myUser;
let myPlaylists = [];

/*
 * Login user
 * This is a way, you can do it how you want
 */
function session() {
    if (sessionStorage.token) {
        client.token = sessionStorage.token;
    } else if (window.location.hash.split('&')[0].split('=')[1]) {
        sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
        client.token = sessionStorage.token;
    }
}
session();
var login = function() {
    client.login().then((url) => {
        window.location.href = url;
	});
}
// 

let search = (data) => {
	return track.search(data);
};

// 
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            user: {}
        }
    }

    componentDidMount() {
    	user.me().then((myUser) => {
			this.setState({user: myUser});
			myUser.playlists().then((playlists) => {
			 	this.setState({playlists: playlists});
			});
		});
    }
   
    render() {
    	return <div>
				<div className="headerBar">
					<button onClick={login}>Login</button>
				</div>
			    <TabbedArea defaultActiveKey={1}>
					<TabPane eventKey={1} tab='Search'><SearchSection user={this.state.user} playlists={this.state.playlists} search={search}/></TabPane>
				    <TabPane eventKey={2} tab='My Playlists'><PlaylistSection user={this.state.user} playlists={this.state.playlists}/></TabPane>
				    <TabPane eventKey={3} tab='Profile'>TabPane 3 content</TabPane>
				</TabbedArea>
			</div>
      }
}

React.render(
	<App/>,
    document.getElementById('container')
);