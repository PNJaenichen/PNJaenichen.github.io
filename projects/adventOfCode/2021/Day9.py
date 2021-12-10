import numpy as np

def get_low(row, col, ar):
  cur_value = ar[row][col]
  if cur_value == 9:
    return False
  else:
    if cur_value > ar[row - 1][col] or cur_value > ar[row][col + 1] or cur_value > ar[row + 1][col] or cur_value > ar[row][col - 1]:
      return False
  return True

def find_basin(row, col, ar):
  cur_value = ar[row][col]
  if cur_value == 9:
    return 0
  else:
    to_check = []
    orthog = [(-1, 0), (0, 1), (-1, 0), (0, -1)]
    for dir in orthog:
      if cur_value == 1 + ar[row + dir[0]][col + dir[1]]:
        to_check.append((row + dir[0], col + dir[1]))
    if len(to_check) == 0:
      return 1
    

lines = '''
921999432109
939878949219
998567898929
987678967899
998999656789
'''.split()

lines = list(map(lambda x: [int(char) for char in x], lines))

# with open('day9.txt') as map:
#   lines = []
#   for i in map.readlines():
#     lines.append([int(char) for char in ('9' + i.strip() + '9')])

first_last = []
for i in range(0, len(lines[0])):
  first_last.append(9)
lines.insert(0, first_last)
lines.append(first_last)
nparray = np.array(lines)
new_lows = []

for i in range(0, len(nparray)):
  for j in range(0, len(nparray[0])):
    if get_low(i, j, nparray):
      new_lows.append(nparray[i][j])

print(f'Their are {len(new_lows)} low points are for a risk value of {sum(new_lows) + len(new_lows)}.')

