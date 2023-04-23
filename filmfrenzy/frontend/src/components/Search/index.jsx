import React from 'react';
import './styles.css';

// This will be my search implementation for the app.
function Search() {
    return (
        <div className="search-container">
            <h1> Welcome! </h1>
            <h4> Your next movie awaits. </h4>
            <input type="text" placeholder="what are we watching next?" className='search-input' />
        </div>
    );
}

export default Search;