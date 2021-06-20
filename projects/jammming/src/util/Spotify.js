import { clientID } from './id';
const redirectURI = 'http://localhost:3000';
let accessToken;

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        window.location = accessURL;
      }
    }
  },
  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {Authorization: `Bearer ${accessToken}`}})
    const results = await response.json();
    if (!results) {
      return [];
    } else {
      return results.tracks.items.map(track => ({id: track.id, name: track.name, artist: track.artists[0].name, album: track.album.name, uri: track.uri}))
    }
  },
  async savePlaylist(name, tracks) {
    if (!name || !tracks.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {'Authorization': 'Bearer ' + accessToken};
    let userID;
    const userResponse = await fetch('https://api.spotify.com/v1/me', {headers: headers});
    const userResults = await userResponse.json();
    userID = userResults.id;
    const playResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {headers: headers, method: 'POST', body: JSON.stringify({name: name})})
    const playResults = await playResponse.json();
    const playlistID = playResults.id;
    await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {headers: headers, method: 'POST', body: JSON.stringify({uris: tracks})})
  }
};