import React from 'react';

class Top extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
            return <div className='top'>
                        <div className='close' onClick={this.props.cancel}>X</div>
                        <div className='search'><span>{this.props.text}</span></div>
                        <div className='save' onClick={this.props.save}>Save Playlist</div>
                    </div>
        }
}

export default Top;