import React from 'react';
import './TrackList.css';
import Track from '../Track/Track'

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        <Track name={this.props.tracks.name} />
      </div>
    )
  }
}

export default TrackList;