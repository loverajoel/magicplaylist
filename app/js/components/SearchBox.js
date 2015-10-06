import React from 'react';

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
    }

    search() {
        if (document.querySelector('.input-search') && document.querySelector('.input-search').value.length > 3) {
            this.props.search(document.querySelector('.input-search').value);
        }
    }

    render() {
            return <div className='search-box'>
                        <div className='search-group'>
                            <span className='input-group-btn'>
                                <button className='btn-search' type='button' onClick={this.search.bind(this)}>Go!</button>
                            </span>
                            <input type='text' className='input-search' placeholder='ej: The pretender, Foo Fighters'/>
                        </div>
                    </div>
        }
}

export default SearchBox;