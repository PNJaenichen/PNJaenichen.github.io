import requests
from bs4 import BeautifulSoup

API_URL = "https://statsapi.web.nhl.com/api/v1/"

web_request = requests.get(API_URL + 'schedule?startDate=2021-10-12&endDate=2021-10-12')
webpage = web_request.content

soup = BeautifulSoup(webpage, 'html.parser')

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

  Returns a BeautifulSoup Object
  """

  season = f"{gameID[:4]}{int(gameID[:4]) + 1}"
  web_request = requests.get(f"http://www.nhl.com/scores/htmlreports/{season}/PL{gameID[4:]}.HTM")

  return BeautifulSoup(web_request.content, 'html.parser')