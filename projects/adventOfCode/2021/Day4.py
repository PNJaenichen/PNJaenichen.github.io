from os import remove
import re

def build_boards(str):
  boards = []
  board = []
  for line in str:
    if line == '':
      if len(board) == 5:
        boards.append(board)
        board = []
      else:
        board = [] 
    else:
      split_line = []
      labels = re.split(r'\s+', line)
      for entry in labels:
        split_line.append([entry, 0])
      board.append(split_line)
  boards.append(board)
  return boards

def mark_call(call, boards):
  for board in boards:
    for line in board:
      for space in line:
        if space[0] == call:
          space[1] = 1

def check_bingo(boards):
  for board in boards:
    for line in board:
      sum = 0
      for i in range(0,5):
        sum += line[i][1]
      if sum == 5:
        return board
    for i in range(0,5):
      sum = 0
      for j in range(0,5):
        sum += board[j][i][1]
      if sum == 5:
        return board
  return False

def remove_bingos(boards):
  winning_board = check_bingo(boards)
  while winning_board:
    boards.remove(winning_board)
    winning_board = check_bingo(boards)
  return boards

with open('day4test.txt') as bingo_stuff:
# with open('day4.txt') as bingo_stuff:
  bingo = []
  for i in bingo_stuff.readlines():
    bingo.append(i.strip())

draws = bingo[0].split(',')
all_boards =  build_boards(bingo[1:])

first_part_boards = all_boards.copy()
for draw in draws:
  mark_call(draw, first_part_boards)
  winning_board = check_bingo(first_part_boards)
  if winning_board:
    unmarked_sum = 0
    for line in winning_board:
      for i in range(0,5):
        if line[i][1] == 0:
          unmarked_sum += int(line[i][0])
    print(unmarked_sum, draw, unmarked_sum * int(draw))
    break  

filtering_wins = all_boards.copy()
for draw in draws:
  mark_call(draw, filtering_wins)
  winning_board = check_bingo(all_boards)
  if winning_board and len(filtering_wins) > 1:
    print(draw, "I'm Here")
    filtering_wins.remove(winning_board)
  else:
    print(draw)
    break
  

  
  