import unicodedata
import requests
import re
from bs4 import BeautifulSoup

API_URL = "https://statsapi.web.nhl.com/api/v1/"

play_id_dict = {'GAME_SCHEDULED': 'PGSTR', 'PERIOD_READY': 'PGEND', 
'PERIOD_START': 'PSTR', 'FACEOFF': 'FAC', 'HIT': 'HIT', 'STOP': 'STOP', 
'SHOT': 'SHOT', 'TAKEAWAY': 'TAKE', 'BLOCKED_SHOT': 'BLOCK', 
'MISSED_SHOT': 'MISS', 'GIVEAWAY': 'GIVE', 'PERIOD_END': 'PEND', 
'PERIOD_OFFICIAL': '', 'GOAL': 'GOAL', 'PENALTY': 'PENL', 'GAME_END': 'GEND', 
'GAME_OFFICIAL': ''}

def search_for_games(start, end=None):
  """
  Gets the list of Game IDs for games played during the requested time period.

  Dates should be in YYYY-MM-DD format as string, with time period requested.
  For same day, enter a single date. Returns a list of all games played during 
  that time period.
  """
  web_request = requests.get(API_URL + f"schedule?startDate={start}&endDate={end if end else start}")
  data_json = web_request.json()
  if end == None:
    gameList = data_json["dates"][0]["games"]
  else:
    gameList = []
    for day in data_json["dates"]:
      for game in day["games"]:
        gameList.append(game)
  return gameList

def get_game_info(gameID):
  """
  Gets game information from the NHL API. 
  
  Takes a single parameter, gameID, in string format.

  Game ID is in the format YYYYTT#### where YYYY is start year of season. 
  TT is the game type: 01 Preseason, 02 Regular Season, 03 Playoffs, and 
  04 All Star. #### is the game number start at 0001. In the playoffs, the 
  second digit indicates the round, the third digit indicates the matchup, 
  and the final digit indicates the game number.

  Returns JSON 
  """
  web_request = requests.get(API_URL + f"game/{str(gameID)}/feed/live")
  data_json = web_request.json()
  if len(data_json) == 2:
    return None
  else:
    return data_json

def get_player_on_ice_info(gameID):
  """
  Gets play information that includes players involved and players on the
  ice at the time of the play. 

  Takes a single parameter, gameID, in string format.

  Game ID is in the format YYYYTT#### where YYYY is start year of season. 
  TT is the game type: 01 Preseason, 02 Regular Season, 03 Playoffs, and 
  04 All Star. #### is the game number start at 0001. In the playoffs, the 
  second digit indicates the round, the third digit indicates the matchup, 
  and the final digit indicates the game number.

  Returns a list of plays.
  """

  season = f"{gameID[:4]}{int(gameID[:4]) + 1}"
  web_request = requests.get(f"http://www.nhl.com/scores/htmlreports/{season}/PL{gameID[4:]}.HTM")
  soup = BeautifulSoup(web_request.content, 'html.parser')

  plays = get_game_info('2021020001')['liveData']['plays']['allPlays']

  main_plays = clean_play_by_play(soup.select('.page'))

  return combine_play_information(main_plays, plays)

def clean_play_by_play(pages):
  """
  Takes the raw html from the NHL play by play page and parses out each 
  of the plays.

  Takes a single parameter, 'pages' which is a list of elements from the
  NHL Play by Play site with the class of page. It then parses out each
  of the plays and does an initial cleaning of the data.

  Returns a list of plays, with each of those being a list. 
  """
  allPlays = []

  for page in pages:
    tableRows = [row for row in page.table.children if row != "\n"]
    data = []
    for row in tableRows:
      rowCells = [block for block in row.children if block != "\n"]
      cleanRow = []
      for row in rowCells:
        cleanRow.append(unicodedata.normalize('NFKD', row.get_text()).strip().replace("\n",""))
      data.append(cleanRow)
    for play in data:
      cleanData = [play for play in data if len(play) == 8]
    for play in cleanData:
      if play[0] == '#':
        continue
      else:
        play[3] = re.findall(r'(\d{1,2}:\d{2})', play[3])
        homePlayers = {}
        visitPlayers = {}
        if 'Ice' not in play[6]:
          for player in play[6].split():
            if (player[-1] == 'D') & ('D1' in homePlayers):
              homePlayers['D2'] = player[:-1]
            elif player[-1] == 'D':
              homePlayers['D1'] = player[:-1]
            else:
              homePlayers[player[-1]] = player[:-1]
          for player in play[7].split():
            if (player[-1] == 'D') & ('D1' in visitPlayers):
              visitPlayers['D2'] = player[:-1]
            elif player[-1] == 'D':
              visitPlayers['D1'] = player[:-1]
            else:
              visitPlayers[player[-1]] = player[:-1]
          play[6] = homePlayers
          play[7] = visitPlayers
        allPlays.append(play)

  return allPlays

def combine_play_information(main_info, player_info):
  """
  Takes two parameters. The first is a list of plays from the NHL Play by
  Play HTML report that has been parsed. The second is the list of plays
  from the same game from the NHL API. It then executes an inner join 
  based on the period, time into the period, and the event type.

  Returns a list of plays in the following format: [playId, period, strength,
  [Time Elapsed, Time Remaining], Event, Descripition, Away Team Players on
  Ice, Home Team Players on Ice, ...1-4 players involved in the play, dateTime,
  Coordinates]
  """
  final_plays = main_info
  track_i = 0
  for mainPlay in final_plays:
    if mainPlay[0] == '#':
      continue
    perTime, timeLeft = mainPlay.pop(3)
    if perTime[0:2] == '0:':
      perTime = '00:' + perTime[-2:]
    mainPlay.insert(3, perTime)
    mainPlay.insert(4, timeLeft)
    for ind in range(track_i, len(player_info)):
      if all([
          play_id_dict[player_info[ind]['result']['eventTypeId']] == mainPlay[5],
          player_info[ind]['about']['period'] == int(mainPlay[1]),
          player_info[ind]['about']['periodTime'] == mainPlay[3]
      ]):
        if 'players' in player_info[ind]:
          mainPlay.append(player_info[ind]['players'][0]['player']['fullName'])
          if len(player_info[ind]['players']) > 1:
            mainPlay.append(player_info[ind]['players'][1]['player']['fullName'])
          if len(player_info[ind]['players']) > 2:
            mainPlay.append(player_info[ind]['players'][2]['player']['fullName'])
          if len(player_info[ind]['players']) > 3:
            mainPlay.append(player_info[ind]['players'][3]['player']['fullName'])
          for _ in range(len(player_info[ind]['players']),4):
            mainPlay.append('')
        else:
          for _ in range(0,4):
            mainPlay.append('')
        mainPlay.append(player_info[ind]['about']['dateTime'])
        mainPlay.append(player_info[ind]['coordinates'])
        track_i = ind + 1
  return final_plays