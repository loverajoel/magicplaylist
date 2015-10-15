'use strict';

import React, {Component} from 'react';

class Alert extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return  <div className='alert-shadow'>
              <div className='alert-modal'>
                <div className='loading'>loading</div>
                <div className='fail'>fail</div>
                <div className='share'>
                  <span></span>
                  <span></span>
                  <span></span>
                  <div>tw,fb</div>
                  <div className='btn-done'></div>
                </div>
              </div>
            </div>
  }
}

export default Alert;
