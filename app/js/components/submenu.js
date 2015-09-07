import React from 'react';
import {Table, Input, DropdownButton, MenuItem} from 'react-bootstrap';

class submenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            track: props.track,
            user: props.user,
            playlists: props.playlists
        };
    }

    addTrack(playlist) {
        playlist.addTrack([this.state.track]);
    }

    removeTrack(playlist) {
        playlist.removeTrack([this.state.track]);
    }

    render() {
        var playlists = this.state.playlists.map((playlist)=>{
            return <MenuItem onSelect={this.addTrack.bind(this, playlist)} key={playlist.id} eventKey={playlist.id}>{playlist.name}</MenuItem>
        });
        return <DropdownButton bsStyle='link' title='...'>
                <MenuItem eventKey='1' disabled={!this.state.user}>Add to favorites</MenuItem>
                <MenuItem eventKey='2' href={this.state.track.uri}>Go to track</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey='3' className="dropdown-submenu" disabled={!this.state.user}>
                    Add to playlist
                    <ul className="dropdown-menu">
                        {playlists}
                    </ul>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey='4'>Copy Track Llink</MenuItem>
                <MenuItem eventKey='5'>Copy Spotify URI</MenuItem>
                <MenuItem eventKey='6'>Copy Embed Code</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey='7' onSelect={this.removeTrack.bind(this, this.props.currentPlaylist)}>Remove from this playlist</MenuItem>
            </DropdownButton>
    }
}

export default submenu;