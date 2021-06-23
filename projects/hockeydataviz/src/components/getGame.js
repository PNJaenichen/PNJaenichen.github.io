async function getGame() {
  try {
    const response = await fetch(`https://statsapi.web.nhl.com/api/v1/game/2020020811/feed/live`);
    const gameData = await response.json();
    return gameData;
  } catch {
    return 'not found'
  }
}

export default getGame;