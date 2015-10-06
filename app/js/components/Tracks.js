import React from 'react/addons';

class Tracks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracksList: this.props.tracksList
        }
    }

    componentWillReceiveProps(props) {
        this.setState({tracksList: props.tracksList});
    }

    remove(index) {
        this.setState({
            tracksList: React.addons.update(this.state.tracksList, {$splice: [[index, 1]]})
        });
    }

    render() {
            var tracks = this.state.tracksList.map((track, i)=>{
                return <li key={track.id}>{track.name}, {track.artists.first().name} <span className="remove" onClick={this.remove.bind(this, i)}>x</span></li>
            });
            return <ul className='trackList'>
                        {tracks}
                    </ul>
        }
}

export default Tracks;