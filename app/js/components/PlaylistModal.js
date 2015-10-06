import React from 'react';

class PlaylistModal extends React.Component {

    constructor(props) {
        super(props);
    }

    close() {
        this.props.close();
    }

    save() {
        if (document.querySelector('.playlist-name') && document.querySelector('.playlist-name').value.length > 3) {
            this.props.save(document.querySelector('.playlist-name').value);
        }
    }

    render() {
            return <div className='playlist-modal'>
                        <div className="modal-container">
                            <h2>Create Playlist</h2>
                            <div>
                                <input type='text' placeholder='Name' className='playlist-name'/>
                            </div>
                            <div>
                                <input type="radio" name="public" value="true"/>Public
                                <input type="radio" name="public" value="false"/>Private
                            </div>

                            <div>
                                <button className='btn-search' type='button' onClick={this.save.bind(this)}>Save</button>
                                <button className='btn-search' type='button' onClick={this.close.bind(this)}>Cancel</button>
                            </div>
                        </div>
                   </div>
        }
}

export default PlaylistModal;