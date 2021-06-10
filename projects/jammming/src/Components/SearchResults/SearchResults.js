import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
  render() {
    const tracks = this.props.searchResults;
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={tracks} />
      </div>
    );
  }
}

export default SearchResults;