import React from 'react';
import SearchBox from './components/SearchBox';
import Tracks from './components/Tracks';
import Top from './components/Top';
import Title from './components/Title';
import PlaylistModal from './components/PlaylistModal';
import Loading from './components/Loading';
import {Client, TrackHandler, PlaylistHandler, ArtistHandler, UserHandler} from 'spotify-sdk';

let client = Client.instance;

client.settings = {
    clientId: '87e58d70ae454ae7b815b4c8a1556a98', 
    secretId: '52bf6c6b92a04e489e8899fc0d291d5f',
    scopes: 'playlist-modify-public user-read-private',
    redirect_uri: 'http://localhost:3000/app/login.html'
};

let settings = {
    tracks: 20,
    artists: 5
}

let track = new TrackHandler();

let total = 0;

let spotify = {
    trackList: [],

    search: (text, callback) => {
        spotify.trackList = [];
        track.search(text, {limit: 1}).then((trackCollection) => {
            trackCollection.first().artists.first().relatedArtists().then((relatedArtists) => {
                relatedArtists = relatedArtists.slice(0, settings.artists);
                relatedArtists.push(trackCollection.first().artists.first());
                for (var i = relatedArtists.length - 1; i >= 0; i--) {
                    total = relatedArtists.length - 1;
                    relatedArtists[i].topTracks({country: 'AR'}).then((tracks) => {
                        for (var e = tracks.length - 1; e >= 0; e--) {
                            spotify.trackList.push(tracks[e]);
                            if (e === 0) {
                                total -= 1;
                                if (total === 0) {
                                    callback(spotify.trackList)
                                }
                            }
                        };
                    });
                };
            });
        });
    },

    order: (list) => {
        return list.sort((a, b) => {
            return a.popularity - b.popularity;
        }).reverse();
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            tracks: [],
            searching: false,
            loading: false,
            user: localStorage.user,
            token: localStorage.token,
            modalOpen: false
        }
    }

    search(text) {
        this.setState({
            text: text,
            searching: true,
            loading: true
        });
        spotify.search(text ,(tracks) => {
            this.setState({
                tracks: spotify.order(tracks).splice(0,settings.tracks),
                loading: false
            });
        });
    }

    cancel() {
        this.setState({
            text: '',
            searching: false,
            tracks: []
        });
    }

    save() {
        if (this.state.token) {
            if (this.state.user) {
                this.setState({
                    modalOpen: true
                });
            } else {
                var user = new UserHandler();
                user.me().then((userEntity) => {
                    this.setState({
                        user: userEntity.id
                    });
                    localStorage.user = userEntity.id;
                    this.save();
                }.bind(this));
            }
        } else {
            let loginWindow;
            client.login().then((url) => {
                loginWindow = window.open(
                    url,
                    'Spotify',
                    'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=400,height=500'
                );
                loginWindow.onbeforeunload = () => {
                    this.setState({
                        token: localStorage.token
                    });
                    client.token = localStorage.token;
                    this.save();
                }.bind(this);
            }.bind(this));
        }
    }

    savePlaylist(data) {
        console.log(data)
        // let playlist = new PlaylistHandler();
        // playlist.create(this.state.user, 'Magic', true).then((myPlaylist) => {
        //     myPlaylist.addTrack(this.state.tracks).then(() => {

        //     });
        // }.bind(this));
    }

    close() {
        this.setState({
            modalOpen: false
        });
    }
   
    render() {
    	return  <div>
                    { this.state.searching ? <Top text={this.state.text} cancel={this.cancel.bind(this)} save={this.save.bind(this)}/> : null }
                    { !this.state.searching ? <Title/> : null }
                    { !this.state.searching ? <SearchBox search={this.search.bind(this)}/> : null }
                    { this.state.searching ? <Tracks tracksList={this.state.tracks} /> : null }
                    { this.state.loading ? <Loading/> : null }
                    { this.state.modalOpen ? <PlaylistModal close={this.close.bind(this)} save={this.savePlaylist.bind(this)}/> : null }
                </div>
    }
}

React.render(
	<App/>,
    document.getElementById('container')
);