const startAPI = 'https://statsapi.web.nhl.com/api/v1/';

export const NHLapi = {
  async monthSearch(year, month) {
    let games = {};
    const daysInMonth = new Date(year, parseInt(month)+1, 0).getDate();
    const endAPI = `schedule?startDate=${year}-${month < 9 ? '0' + (parseInt(month) + 1) : parseInt(month) + 1}-01&endDate=${year}-${month < 9 ? '0' + (parseInt(month) + 1) : parseInt(month) + 1}-${daysInMonth}`;
    console.log(startAPI + endAPI);
    const response = await fetch(startAPI + endAPI);
    const responseJSON = await response.json();
    if (!responseJSON) {
      return [];
    } else {
      responseJSON.dates.forEach(x => games[parseInt(x.date.slice(8))] = x);
      return [month, year, games];
    }
  }
}
