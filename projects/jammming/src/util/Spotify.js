let userAccess = null;

export const Spotify = {
  getAccessToken() {
    if (userAccess) {
      return userAccess;
    } else {
      return null
    }
  }
};