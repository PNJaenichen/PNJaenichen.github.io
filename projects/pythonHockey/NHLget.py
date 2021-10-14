import requests
from bs4 import BeautifulSoup

## https://statsapi.web.nhl.com/api/v1/schedule?startDate=2021-10-12&endDate=2021-10-12

web_request = requests.get('https://statsapi.web.nhl.com/api/v1/schedule?startDate=2021-10-12&endDate=2021-10-12')
webpage = web_request.content

soup = BeautifulSoup(webpage, 'html.parser')

data_json = web_request.json()
print(data_json)
