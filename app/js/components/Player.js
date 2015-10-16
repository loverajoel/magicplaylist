'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Track extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src: this.props.source,
      elem: null,
      isPlaying: false
    }
  }

  componentDidMount() {
    let tag = ReactDOM.findDOMNode(this.refs.audio);
    // tag.prototype.myStop = this._stop();
    this.props.ptag(tag);

    tag.onended = () => {
      this.setState({
        isPlaying: false
      });
    };

    tag.onpause = () => {
      this.setState({
        isPlaying: false
      });
    };

    this.setState({
      elem: tag
    });
  }

  _play() {
    this.props.stopAll.apply();
    this.state.elem.play();
    this.setState({
      isPlaying: true
    });
  }

  _stop() {
    this.state.elem.pause();
    this.setState({
      isPlaying: false
    });
  }

  render() {
    return  <div>
              {!this.state.isPlaying ? <img src='img/volume.svg' onClick={this._play.bind(this)}/> : null}
              {this.state.isPlaying ? <img src='img/pause.svg' onClick={this._stop.bind(this)}/> : null}
              <audio ref='audio' src={this.props.source}/>
            </div>
  }
}

export default Track;
