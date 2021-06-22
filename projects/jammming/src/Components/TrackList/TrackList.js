import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track'

export class TrackList extends React.Component {
  render() {
    let searchTracks = this.props.tracks;
    if (this.props.playlistTracks) {
      const playlistUris = this.props.playlistTracks.map(track => track.uri);
      searchTracks = this.props.tracks.filter(track => !playlistUris.includes(track.uri));
    }     
    return (
      <div className="TrackList">
        {searchTracks.map(currentTrack => {
          return <Track track={currentTrack} key={currentTrack.id}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            isRemoval={this.props.isRemoval} />
      })}
      </div>
    )
  }
}
