import React from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList'

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  
  handleNameChange(event) {
    this.props.onNameChange(event.target.Value);
  }
  
  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={"New Playlist"}/>
        <TrackList tracks={this.props.tracks} isRemoval={true} onRemove={this.props.onRemove}/>
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    )
  }
}