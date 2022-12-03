testInput = '''A Y
B X
C Z'''

opp_play = {'A': 1, 'B': 2, 'C': 3}
play_play = {'X': 1, 'Y': 2, 'Z': 3}

opp_winnings = {'A': 'Z', 'B': 'X', 'C': 'Y'}
ply_winnings = {'C': 'X', 'A': 'Y', 'B': 'Z'}
draw = {'A': 'X', 'B': 'Y', 'C': 'Z' }
play_total = 0

with open('PNJaenichen.github.io\\projects\\adventOfCode\\2022\\day2input.txt') as bigList:
  games = bigList.read()

for line in games.splitlines():
  opponent, player = line.split()
  hand_total = play_play[player]
  if draw[opponent] == player:
    hand_total += 3
  elif ply_winnings[opponent] == player:
    hand_total += 6
  play_total += hand_total
  
print(f'Part 1 answer: {play_total}')

play_total = 0

for line in games.splitlines():
  opponent, ending = line.split()
  if ending == 'X':
    hand_total = play_play[opp_winnings[opponent]]
  elif ending == 'Y':
    hand_total = 3 + play_play[draw[opponent]]
  else:
    hand_total = 6 + play_play[ply_winnings[opponent]]
  play_total += hand_total
  
print(f'Part 2 answer: {play_total}')