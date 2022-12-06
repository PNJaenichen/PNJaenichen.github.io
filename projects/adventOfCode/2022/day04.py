testInput = '''2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
'''

pairings = []

with open('day04input.txt') as bigList:
  elfPairs = bigList.read()

for elfPair in elfPairs.splitlines():
  sections = elfPair.split(',')
  elfOne = sections[0].split('-')
  elfTwo = sections[1].split('-')
  elfOne_sections = list(range(int(elfOne[0]), int(elfOne[1]) + 1))
  elfTwo_sections = list(range(int(elfTwo[0]), int(elfTwo[1]) + 1))
  pairings.append([elfOne_sections, elfTwo_sections])


def pairInPair(elfOne, elfTwo):
  if len(elfOne) <= len(elfTwo):
    return all([x in elfTwo for x in elfOne])
  else:
    return all([x in elfOne for x in elfTwo])

def anyPairs(elfOne, elfTwo):
  if len(elfOne) <= len(elfTwo):
    return any([x in elfTwo for x in elfOne])
  else:
    return any([x in elfOne for x in elfTwo])

wastedPair = 0
totalOver = 0

for pairing in pairings:
  if pairInPair(pairing[0], pairing[1]):
    wastedPair += 1
  if anyPairs(pairing[0], pairing[1]):
    totalOver += 1

print(wastedPair)
print(totalOver)