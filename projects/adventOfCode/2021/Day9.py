import numpy as np
from numpy.core.fromnumeric import sort

def get_low(row, col, ar):
  cur_value = ar[row][col]
  if cur_value == 9:
    return False
  else:
    if cur_value > ar[row - 1][col] or cur_value > ar[row][col + 1] or cur_value > ar[row + 1][col] or cur_value > ar[row][col - 1]:
      return False
  return True

def find_basin(row, col, ar):
  all_grids = [(row, col)]
  cur_value = ar[row][col]
  if cur_value == 9:
    return 0
  else:
    to_check = []
    orthog = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    for dir in orthog:
      if (cur_value + 1) == ar[row + dir[0]][col + dir[1]] and (cur_value + 1) != 9:
        to_check.append((row + dir[0], col + dir[1]))
    if len(to_check) == 0:
      return (row,col)
    else:
      for new_check in to_check:
        all_grids.append(new_check)
        all_grids.append(find_basin(new_check[0], new_check[1], ar))
  return all_grids

def flatten(list_of_lists):
    if len(list_of_lists) == 0:
        return list_of_lists
    if isinstance(list_of_lists[0], list):
        return flatten(list_of_lists[0]) + flatten(list_of_lists[1:])
    return list_of_lists[:1] + flatten(list_of_lists[1:])

# lines = '''
# 921999432109
# 939878949219
# 998567898929
# 987678967899
# 998999656789
# '''.split()

# lines = list(map(lambda x: [int(char) for char in x], lines))

with open('day9.txt') as map:
  lines = []
  for i in map.readlines():
    lines.append([int(char) for char in ('9' + i.strip() + '9')])

first_last = []
for i in range(0, len(lines[0])):
  first_last.append(9)
lines.insert(0, first_last)
lines.append(first_last)
nparray = np.array(lines)
new_lows = []
basin_sizes = []

for i in range(0, len(nparray)):
  for j in range(0, len(nparray[0])):
    if get_low(i, j, nparray):
      new_lows.append(nparray[i][j])
      basin_sizes.append(len(set(flatten(find_basin(i, j, nparray)))))

print(f'Their are {len(new_lows)} low points are for a risk value of {sum(new_lows) + len(new_lows)}.')

basin_sizes_sorted = sorted(basin_sizes, reverse=True)
large_basin_product = basin_sizes_sorted[0] * basin_sizes_sorted[1] * basin_sizes_sorted[2]

print(basin_sizes_sorted)

print(large_basin_product)

# 734096 is too low