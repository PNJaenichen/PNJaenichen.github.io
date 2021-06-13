import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track'

export class TrackList extends React.Component {
  render() {
    if (this.props.tracks) {
      const trackElements = this.props.tracks.map(element => 
        <Track odAdd={this.props.onAdd} track={element} />
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
