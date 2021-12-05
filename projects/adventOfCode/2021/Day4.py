import re

with open('day4test.txt') as bingo_stuff:
# with open('day4.txt') as bingo_stuff:
  bingo = []
  for i in bingo_stuff.readlines():
    bingo.append(i.strip())


draws = bingo[0].split(',')
rough_boards = bingo[1:]

board = []
for line in rough_boards:
  if line == '':
    board = []
  else:
    split_line = re.split(r'\s+', line)
    print(split_line)