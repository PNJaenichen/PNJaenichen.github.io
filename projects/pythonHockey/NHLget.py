import requests
from bs4 import BeautifulSoup

API_URL = "https://statsapi.web.nhl.com/api/v1/"

web_request = requests.get(API_URL + 'schedule?startDate=2021-10-12&endDate=2021-10-12')
webpage = web_request.content

soup = BeautifulSoup(webpage, 'html.parser')

def search_for_games(start, end=None):
  """
  Dates should be in YYYY-MM-DD format as string, with time period requested.
  For same day, just enter a single date.
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

test_run = search_for_games("2021-10-12", "2021-10-13")

for game in test_run:
  print(game["gamePk"])