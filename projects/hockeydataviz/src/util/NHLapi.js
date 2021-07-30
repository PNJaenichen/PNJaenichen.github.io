const startAPI = 'https://statsapi.web.nhl.com/api/v1/';

export const NHLapi = {
  async monthSearch(year, month) {
    let games = {};
    const daysInMonth = new Date(year, parseInt(month)+1, 0).getDate();
    const endAPI = `schedule?startDate=${year}-${month < 9 ? '0' + (parseInt(month) + 1) : parseInt(month) + 1}-01&endDate=${year}-${month < 9 ? '0' + (parseInt(month) + 1) : parseInt(month) + 1}-${daysInMonth}`;
    const response = await fetch(startAPI + endAPI);
    const responseJSON = await response.json();
    if (!responseJSON) {
      return [];
    } else {
      responseJSON.dates.forEach(x => games[parseInt(x.date.slice(8))] = x);
      return [month, year, games];
    }
  },

  async getGameData(gameID) {
    const endAPI = `game/${gameID}/feed/live`
    const response = await fetch(startAPI + endAPI);
    const responseJSON = await response.json();
    if (!responseJSON) {
      return {};
    } else {
      return responseJSON;
    }
  },

  async getGameReport(gameID, season) {
    const htmlReport = `http://www.nhl.com/scores/htmlreports/${season}/PL${gameID}.HTM`;
    const response = await fetch(htmlReport)
    const responseText = response.text()
    if (!responseText) {
      return ''
    } else {
      return responseText
    }
  }
}