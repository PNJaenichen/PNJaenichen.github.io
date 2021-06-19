import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'testList',
      playlistTracks: [],
      searchResults: [],
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const prevPlaylist = this.state.playlistTracks;
    const trackIDs = prevPlaylist.map(a => a.id);
    if (!trackIDs.includes(track.id)) {
      const newList = prevPlaylist.push(track);
      this.setState({playlistTracks: newList});
    }
  }

  removeTrack(track) {
    const prevPlaylist = this.state.playlistTracks;
    const newList = prevPlaylist.filter(a => a.id !== track.id);
    this.setState({playlistTracks: newList})
  }

  updatePlaylistName(newName) {
    this.setState({playlistName: newName})
  }

  savePlaylist() {
    return this.state.playlistTracks.map(a => a.uri);
  }

  search(term) {
    Spotify.search(term).then(searchResults => this.setState({searchResults: searchResults}));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className='App-playlist'>
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist 
              playlistName={this.state.playlistName} 
              onNameChange={this.updatePlaylistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

