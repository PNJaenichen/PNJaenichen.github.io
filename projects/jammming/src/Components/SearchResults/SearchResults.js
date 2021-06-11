import React from 'react';
import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList';

export class SearchResults extends React.Component {
  render() {
    const tracks = this.props.searchResults;
    console.log(tracks);
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={tracks} />
      </div>
    );
  }
}