import numpy as np

lines = '''
2199943210
3987894921
9856789892
8767896789
9899965678
'''.split()

# with open('day9.txt') as map:
#   lines = []
#   for i in map.readlines():
#     lines.append(i.strip())

def check_low(row, col, height, width, ar):
  cur_value = int(ar[row][col])
  if col == width - 1:
    if cur_value >= int(lines[row][col - 1]):
      return False
  elif col == 0:
    if cur_value >= int(lines[row][col + 1]):
      return False
  else:
    if cur_value >= int(lines[row][col - 1]) or cur_value >= int(lines[row][col + 1]):
      return False
  if row == 0:
    if cur_value >= int(lines[row + 1][col]):
      return False
  elif row == height - 1:
    if cur_value >= int(lines[row - 1][col]):
      return False
  else:
    if cur_value >= int(lines[row - 1][col]) or cur_value >= int(lines[row + 1][col]):
      return False
  return True
  
map_height = len(lines)
map_width = len(lines[0])
low_points = []

for i in range(0,map_height):
  for j in range(0,map_width):
    cur_value = int(lines[i][j])
    if check_low(i, j, map_height, map_width, lines):
      low_points.append(cur_value)

print(f'The risk value is {sum(low_points) + len(low_points)}.')

nparray = np.array(list(map(lambda x: [char for char in x], lines)))

print(nparray)