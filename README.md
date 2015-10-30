#Magic Playlist /

> Get the playlist of your dreams based on a song

[![title](https://raw.githubusercontent.com/loverajoel/magicplaylist/master/app/img/title-github.jpg)](http://magicplaylist.co/)

Magic Playlist is an intelligent algorithm developed under Spotify's API that enables users to create a playlist based on a song.

The algorithm detects the main artists and creates a playlist based on their high rated tracks. You can preview each song, remove it and add security attributions such as public or private. Give it a name, save it into your Spotify's account and enjoy!

Go to [MagicPlaylist /](http://magicplaylist.co/)

#Features
- Create an Awesome playlist based on a song
- Play audio preview (30 seconds)
- Edit playlist
- Save playlist in Spotify
- Share playlist

#Algorithm Overview
1. Given a Track extract his popularity
2. Get related Artists form that Track
3. Get top tracks from each related Artist
4. Sort all Tracks from popularity(ASC)
5. Alternate by Artist
6. Select a batch of 30 Tracks most closest to the first Track popularity
7. Sort by popularity
8. Alternate by Artist
9. Enjoy the playlist

[The Algorithm](https://github.com/loverajoel/magicplaylist/blob/master/app/js/core/Magic.js) :star2: 

#Stack
- ES6
- Flux
- React
- [Spotify-SDK](https://github.com/loverajoel/spotify-sdk)

#Spotify API

This entire app is based on [Spotify API](https://developer.spotify.com/web-api/):heart:

#Stay In Touch

Follow us for news [@magicplaylistco](https://twitter.com/magicplaylistco)

#Press

[![MagicPlaylist Creates Spotify Playlists Based on a Single Song](https://raw.githubusercontent.com/loverajoel/magicplaylist/master/app/img/press-lifehack.jpg)](http://lifehacker.com/magicplaylist-creates-spotify-playlists-based-on-a-sing-1739415795)

[![CNET - Create Spotify playlists based on one song with MagicPlaylist](https://raw.githubusercontent.com/loverajoel/magicplaylist/master/app/img/press-cnet.jpg)](http://www.cnet.com/how-to/create-spotify-playlists-based-on-one-song-with-magicplaylist/)

[![MagicPlaylist - Create Spotify playlists based on one song](https://raw.githubusercontent.com/loverajoel/magicplaylist/master/app/img/press-ph.jpg)](https://www.producthunt.com/tech/magic-playlist/)

[![MagicPlaylist trenger bare én sang](https://raw.githubusercontent.com/loverajoel/magicplaylist/master/app/img/press-dnet.jpg)](http://www.dinside.no/935094/magicplaylist-trenger-bare-n-sang)

#Contributing


```
npm install
npm run dev
```
# Authors

Code by Lovera Joel ([@loverajoel](https://twitter.com/loverajoel))

Design by Agustín Schelstraete ([@aschelstraete](https://twitter.com/aschelstraete))


Made with :heart: from Córdoba, Argentina.
