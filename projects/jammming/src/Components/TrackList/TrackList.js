import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track'

export class TrackList extends React.Component {
  render() {
    if (this.props.tracks) {
      const trackElements = this.props.tracks.map(element => 
        <Track id={element.id} name={element.name} artist={element.artist} album={element.album} />
      )
      return (
        <div className="TrackList">
          {trackElements}
        </div>
      )
    }
    return null
  }
}
