import urllib.request, urllib.parse, urllib.error
import json

address = input('Enter location: ')
print('Retrieving', address)
uh = urllib.request.urlopen(address)
data = uh.read()
print('Retrieved', len(data), 'characters')

info = json.loads(data)
print('User count:', len(info['comments']))

total = 0
for comment in info['comments']:
  total += comment['count']
  
print(total)