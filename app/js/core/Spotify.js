'use strict';

import {Client, TrackHandler, PlaylistHandler, ArtistHandler, UserHandler} from 'spotify-sdk';

let client = Client.instance;

client.settings = {
  clientId: '87e58d70ae454ae7b815b4c8a1556a98',
  secretId: '52bf6c6b92a04e489e8899fc0d291d5f',
  scopes: 'playlist-modify-public user-read-private playlist-modify-private',
  redirect_uri: 'http://localhost:3000/app/login.html'
};

let settings = {
  tracks: 20,
  artists: 5
}

let track = new TrackHandler();
let user = new UserHandler();
let playlist = new PlaylistHandler();

let total = 0;

let Spotify = {
  trackList: [],

  search: (text, callback) => {
    Spotify.trackList = [];
    track.search(text, {limit: 1}).then((trackCollection) => {
      if (trackCollection.length) {
        trackCollection.first().artists.first().relatedArtists().then((relatedArtists) => {
            relatedArtists = relatedArtists.slice(0, settings.artists);
            relatedArtists.push(trackCollection.first().artists.first());
            for (var i = relatedArtists.length - 1; i >= 0; i--) {
                total = relatedArtists.length - 1;
                relatedArtists[i].topTracks({country: 'AR'}).then((tracks) => {
                    for (var e = tracks.length - 1; e >= 0; e--) {
                        Spotify.trackList.push(tracks[e]);
                        if (e === 0) {
                            total -= 1;
                            if (total === 0) {
                                callback(Spotify.order(Spotify.trackList), trackCollection.first());
                            }
                        }
                    };
                }).catch((error) => {

                });
            };
        });
      } else {
        callback([]);
      }
    });
  },

  order: (list) => {
      return list.sort((a, b) => {
          return a.popularity - b.popularity;
      }).reverse();
  },

  login: () => {
    return new Promise((resolve, reject) => {
      let loginWindow;
      client.login().then((url) => {
          loginWindow = window.open(
              url,
              'Spotify',
              'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=400,height=500'
          );
          loginWindow.onbeforeunload = () => {
              resolve(localStorage.magic_token);
          }
      });
    });
  },

  getUser: () => {
    client.token = localStorage.magic_token;
    return new Promise((resolve, reject) => {
      user.me().then((userEntity) => {
          localStorage.magic_user = JSON.stringify(userEntity);
          resolve(userEntity);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  savePlaylist: (userId, name, isPublic, tracks) => {
    client.token = localStorage.magic_token;
    return new Promise((resolve, reject) => {
      playlist.create(userId, name+' by magicplaylist.co', isPublic).then((myPlaylist) => {
        myPlaylist.addTrack(tracks).then((snapshot) => {
          resolve(snapshot);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
}

export default Spotify;
