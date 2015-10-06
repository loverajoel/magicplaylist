import React from 'react';

class Loading extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
            return <img className='loading' src='style/audio.svg'/>
        }
}

export default Loading;