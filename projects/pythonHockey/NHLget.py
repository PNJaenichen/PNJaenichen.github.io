import unicodedata
import requests
import re
from bs4 import BeautifulSoup

API_URL = "https://statsapi.web.nhl.com/api/v1/"

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
  Gets player on ice information for a game from the Official Game Play by 
  Play document produced by the NHL via NHL.com.

  Takes a single parameter, gameID, in string format.

  Game ID is in the format YYYYTT#### where YYYY is start year of season. 
  TT is the game type: 01 Preseason, 02 Regular Season, 03 Playoffs, and 
  04 All Star. #### is the game number start at 0001. In the playoffs, the 
  second digit indicates the round, the third digit indicates the matchup, 
  and the final digit indicates the game number.

  Returns a list of plays that requires additional cleaning.
  """

  season = f"{gameID[:4]}{int(gameID[:4]) + 1}"
  web_request = requests.get(f"http://www.nhl.com/scores/htmlreports/{season}/PL{gameID[4:]}.HTM")
  return BeautifulSoup(web_request.content, 'html.parser')

def clean_play_by_play(pages):
  """
  Takes the raw html from the NHL play by play page and parses out each 
  of the plays.

  Takes a single parameter, 'pages' which is a list of elements from the
  NHL Play by Play site with the class of page. It then parses out each
  of the plays and does an initial cleaning of the data.

  Returns a list of plays, with each of those being a list. The first 
  element is the column names, and the following elements contain the play
  information.
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
      play[3] = re.findall(r'(\d{1,2}:\d{2})', play[3])
      homePlayers = {}
      visitPlayers = {}
      if 'Ice' not in play[6]:
        for player in play[6].split():
          homePlayers[player[-1]] = player[:-1]
        for player in play[7].split():
          visitPlayers[player[-1]] = player[:-1]
        play[6] = homePlayers
        play[7] = visitPlayers
      allPlays.append(play)

  return allPlays

