import React, {Component} from 'react';

class Tip extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div className='tip'>
              <span>Tip: Type a song + artist for better results.</span>
              <span>(ex: Triller, Michael Jackson)</span>
            </div>;
  }
}

export default Tip;
