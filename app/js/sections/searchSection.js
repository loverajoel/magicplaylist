import React from 'react';
import {Table, Input, DropdownButton, MenuItem} from 'react-bootstrap';
import Submenu from '../components/submenu';

class searchSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            playlists: [],
            user: null
        }
    }

    componentWillReceiveProps(props) {
        this.setState({user: props.user});
        this.setState({playlists: props.playlists});
    }
    
    handleChange() {
        if (document.querySelector('.searchMusicInput').value.length > 3) {
            this.props.search(document.querySelector('.searchMusicInput').value).then((collection) => { 
                this.setState({tracks: collection});
            });
        }
    }

    render() {
        var tracks = this.state.tracks.map((track)=>{
            return <tr key={track.id}>
                    <td><Submenu track={track} user={this.state.user} playlists={this.state.playlists}/></td>
                    <td>{track.name}</td>
                    <td>{track.artists.first().name}</td>
                    <td>{track.album.name}</td>
                    <td>{track.durationM}</td>
                  </tr>
        });
        return <div>
                    <div>
                    	<Input
                            type='text'
                            placeholder='Enter text'
                            label='Search Music'
                            ref='input'
                            groupClassName='group-class'
                            labelClassName='label-class'
                            className="searchMusicInput"
                            onChange={this.handleChange.bind(this)} />
                    </div>
                    <div>
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
                    </div>
                </div>;
        }
}

export default searchSection;