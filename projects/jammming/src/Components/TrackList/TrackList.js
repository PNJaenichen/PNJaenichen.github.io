import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track'

export class TrackList extends React.Component {
  render() {
    if (this.props.tracks) {
      const trackElements = this.props.tracks.map(element => 
        <Track onAdd={this.props.onAdd} 
          onRemove={this.props.onRemove} 
          isRemoval={this.props.isRemoval} 
          track={element} />
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
