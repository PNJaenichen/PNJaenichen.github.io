import urllib.request, urllib.parse, urllib.error
import xml.etree.ElementTree as ET

address = input('Enter location: ')
print('Retrieving', address)
uh = urllib.request.urlopen(address)
data = uh.read()
print('Retrieved', len(data), 'characters')
tree = ET.fromstring(data)

results = tree.findall('.//comment')

count = 0
for result in results:
    count += int(result.find('count').text)

print(count)