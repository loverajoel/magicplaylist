#Magic Playlist
// Get the playlist of your dreams based on a song

Magic Playlist is an inteligent algorythm developed under Spotify's API that enables users to create a playlist based on a song.

The architecture detects the main artists and creates a playlist based on their high rated tracks. You can preview each song, remove it and add security attributions such as public or private. Give it a name, save it into your Spotify's account and enjoy!

#Features
- Create an Awesome playlist based on a song
- Play audio preview (30 seconds)
- Save playlist in Spotify
- Share playlist

#Algorithm Overview
- Given a Track extract his `popularity`
- Get related Artists form a Track
- Get top tracks(max:20) from each related Artist
- Sort all Tracks from popularity(ASC)
- Alternate 1:1
- Select the batch(30) based in the first Track popularity
- Sort by popularity
- Alternate
- Enjoy the playlist

#Stack
- ES6
- Flux
- React
- Spotify-SDK

#Spotify API

#/Stay In Touch

#Contributing
To get started with a development installation of the Query Server and learn more about contributing, please follow the instructions at our Developers Guide.

```
npm install
npm run dev
```

#License

Made with :heart: from Córdoba, Argentina.
