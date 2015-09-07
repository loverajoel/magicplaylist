import React from 'react';
import {Table, Input, DropdownButton, MenuItem} from 'react-bootstrap';
import Submenu from '../components/submenu';

class playlistSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPlaylist: null,
            playlists: this.props.playlists,
            user: null,
            tracks: []
        }
    }

    componentWillReceiveProps(props) {
        this.setState({playlists: props.playlists});
    }

    loadTracks(playlist) {
        this.setState({currentPlaylist: playlist});
        playlist.tracks().then(trackList => {
            this.setState({tracks: trackList});
        });
    }

    render() {
        var playlists = this.state.playlists.map((playlist)=>{
            return <li onClick={this.loadTracks.bind(this, playlist)}>{playlist.name}</li>
        });

        var tracks = this.state.tracks.map((track)=>{
            return <tr key={track.id}>
                    <td><Submenu track={track} user={this.state.user} playlists={this.state.playlists} currentPlaylist={this.state.currentPlaylist}/></td>
                    <td>{track.name}</td>
                    <td>{track.artists.name}</td>
                    <td>{track.album.name}</td>
                    <td>{track.duration}</td>
                  </tr>
        });
        return <div>
                    <div>
                        <ul>
                            {{playlists}}
                        </ul>
                    </div>
                    <Table responsive>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>SONG</th>
                            <th>ARTIST</th>
                            <th>ALBUM</th>
                            <th>TIME</th>
                          </tr>
                        </thead>
                        <tbody>
                            {tracks}
                        </tbody>
                      </Table>
                </div>;
        }
}

export default playlistSection;