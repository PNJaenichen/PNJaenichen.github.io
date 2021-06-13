import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'testList',
      playlistTracks: [
        {
          id: 1,
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Madman Across The Water'
        },
        {
          id: 2,
          name: 'Indian Outlaw',
          artist: 'Tim McGraw',
          album: 'Love Story'
        }],
      searchResults: null,
    }
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    const prevPlaylist = this.state.playlistTracks;
    const trackIDs = prevPlaylist.map(a => a.id);
    if (trackIDs.includes(track.id)) {
      const newList = prevPlaylist.push(track);
      this.setState({playlistTracks: newList});
    }
  }

  render() {
    return (
      <div>
      <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className='App-playlist'>
            <SearchResults onAdd={this.addTrack}/>
            <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

