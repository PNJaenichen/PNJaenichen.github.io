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
    if thats_a_bingo(board):
      return board
    else:
      continue
  return False

def thats_a_bingo(board):
  for line in board:
    sum = 0
    for i in range(0,5):
      sum += line[i][1]
    if sum == 5:
      return True
  for i in range(0,5):
    sum = 0
    for j in range(0,5):
      sum += board[j][i][1]
    if sum == 5:
      return True
  return False

def remove_bingos(boards):
  return list(filter(lambda x: not thats_a_bingo(x), boards))

# with open('day4test.txt') as bingo_stuff:
with open('day4.txt') as bingo_stuff:
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

second_part_boards = all_boards.copy()
for draw in draws:
  mark_call(draw, second_part_boards)
  winning_board = check_bingo(second_part_boards)
  if winning_board and len(second_part_boards) > 1:
    second_part_boards = remove_bingos(second_part_boards)
  elif winning_board and len(second_part_boards) == 1:
    unmarked_sum = 0
    for line in winning_board:
      for i in range(0,5):
        if line[i][1] == 0:
          unmarked_sum += int(line[i][0])
    print(unmarked_sum, draw, unmarked_sum * int(draw))
    break


  

  
  