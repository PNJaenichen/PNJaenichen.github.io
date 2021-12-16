import numpy as np

def setup_octopus(disp):
  adj_lines = []
  top_bottom = [char for char in ('x' * (len(disp[0]) + 2))]
  adj_lines.append(top_bottom)
  for line in disp:
    new_line = [[int(char), False] for char in line]
    new_line.insert(0, 'x')
    new_line.append('x')
    adj_lines.append(new_line)
  adj_lines.append(top_bottom)
  return adj_lines

def update_board(disp):
  for i in range(len(disp)):
    for j in range(len(disp[0])):
      if disp[i][j] == 'x':
        continue
      else:
        disp[i][j][0] += 1
        
def update_flash(prev_board):
  flash_count = 0
  flashing = True
  new_board = prev_board.copy()
  surrounds = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
  while flashing:
    old_count = flash_count
    for i in range(len(new_board)):
      for j in range(len(new_board[0])):
        if new_board[i][j] == 'x':
          continue
        elif new_board[i][j][0] >= 9 and not new_board[i][j][1]:
          new_board[i][j][1] = True
          new_board[i][j][0] = 0
          flash_count += 1
          for grid in surrounds:
            new_pos = new_board[i + grid[0]][j + grid[1]]
            if new_pos != 'x':
              new_pos[0] += 1
    if old_count == flash_count:
      flashing = False
  update_board(new_board)         
  for i in range(len(new_board)):
    for j in range(len(new_board[0])):
      if new_board[i][j] == 'x':
        continue
      elif new_board[i][j][1]:
        new_board[i][j][1] = False
        new_board[i][j][0] = 0
  return [flash_count, new_board]

def checkAllFlash(board):
  for i in range(len(board)):
    for j in range(len(board[0])):
      if board[i][j] == 'x':
        continue
      elif board[i][j][0] != 0:
        return False
  return True

# lines = ['11111', '19991', '19191', '19991', '11111']

# lines = ['5483143223',
# '2745854711',
# '5264556173',
# '6141336146',
# '6357385478',
# '4167524645',
# '2176841721',
# '6882881134',
# '4846848554',
# '5283751526']

lines = ['6227618536',
'2368158384',
'5385414113',
'4556757523',
'6746486724',
'4881323884',
'4648263744',
'4871332872',
'4724128228',
'4316512167']

board = setup_octopus(lines)
steps = 100
total_flash = 0
step_count = 0
checking_flashes = True

while checking_flashes:
  upFlash, board = update_flash(board)
  total_flash += upFlash
  if step_count == steps - 1:
    print(f'There were a total of {total_flash} flashes after {steps} steps.')
  if checkAllFlash(board):
    step_count += 1
    checking_flashes = False
    print(f'All flashed on step {step_count}.')
  else:
    step_count += 1