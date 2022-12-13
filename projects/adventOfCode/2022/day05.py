import copy

testInput = '''    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
'''

def chunkRow(thisRow):
  return [ thisRow[i:i+4].strip() for i in range(0, len(thisRow), 4) ]

def direction(inp):
  broken = inp.split()
  return [int(broken[1]), broken[3], broken[5]]

with open('day05input.txt') as f:
  biglist = f.read()

map_start = {}
split_rows = []
directions = []

for row in biglist.splitlines():
  if row and 'move' not in row:
    split_rows.append(chunkRow(row))
  elif 'move' in row:
    directions.append(direction(row))

for col in split_rows[-1]:
  col_items = [col_item[split_rows[-1].index(col)] for col_item in split_rows[:-1]]
  col_items.reverse()
  map_start[col] = list(filter(None, col_items))

part2_map = copy.deepcopy(map_start)

for dir in directions:
  for i in range(0, dir[0]):
    map_start[dir[2]].append(map_start[dir[1]].pop())
  if len(part2_map[dir[1]]) < dir[0]:
    part2_map[dir[2]].extend(part2_map[dir[1]])
    part2_map[dir[1]] = []
  else:
    column_one = part2_map[dir[1]][:-dir[0]]
    part2_map[dir[2]].extend(part2_map[dir[1]][-dir[0]:])
    part2_map[dir[1]] = column_one

print('Part 1:')

for k,v in map_start.items():
  print(f'Column {k} top crate: {v[-1]}.')

print('Part 2:')

for k,v in part2_map.items():
  print(f'Column {k} top crate: {v[-1]}.')