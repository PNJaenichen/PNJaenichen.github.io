def tuple_coord(ends):
  format_ends = []
  for end in ends:
    end = list(map(lambda x: int(x), end.split(',')))
    format_ends.append(tuple(end))
  return format_ends

def find_minmax_xy(ax, ends):
  max_xy = 0
  min_xy = 0
  i = 0
  if ax == 'y': i = 1
  for line in ends:
    xy1 = line[0][i]
    xy2 = line[1][i]
    if xy1 > max_xy: max_xy = xy1
    if xy2 > max_xy: max_xy = xy2
    if xy1 < min_xy: min_xy = xy1
    if xy2 < min_xy: min_xy = xy2
  return (min_xy, max_xy)

def build_map(x, y):
  main_map = []
  for i in range(y[0], y[1] + 1):
    row = []
    for j in range(x[0], x[1] + 1):
      row.append(0)
    main_map.append(row)
  return main_map

with open('day5test.txt') as coords:
# with open('day5.txt') as coords:
  lines = []
  for i in coords.readlines():
    lines.append(tuple_coord(i.strip().split(' -> ')))

board = build_map(find_minmax_xy('x', lines), find_minmax_xy('y', lines))

for line in lines:
  x_start = min([line[0][0], line[1][0]])
  x_end = max([line[0][0], line[1][0]])
  y_start = min([line[0][1], line[1][1]])
  y_end = max([line[0][1], line[1][1]])
  if x_start != x_end and y_start != y_end:
    adjust_x = 1 if (line[0][0] - line[1][0]) < 0 else -1
    adjust_y = 1 if (line[0][1] - line[1][1]) < 0 else -1
    xs = range(line[0][0], line[1][0], adjust_x)
    ys = range(line[0][1], line[1][1], adjust_y)
    print(line, xs, ys)


 # 8,0 .. 7,1 .. 6,2 .. 5,3 .. 4,4 .. 3,5 .. 2,6 .. 1,7 .. 0,8
 # 6,4 .. 5,3 .. 4,2 .. 3,1 .. 2,0
 # 0,0 .. 1,1 .. 2,2 .. 3,3 .. 4,4 .. 5,5 .. 6,6 .. 7,7 .. 8,8
 # 5,5 .. 6,4 .. 7,3 .. 8,2       
  elif x_start == x_end:
    for i in range(y_start, y_end + 1):
      board[i][x_start] += 1
  elif y_start == y_end:
    for i in range(x_start, x_end + 1):
      board[y_start][i] += 1

# print(lines)
# for row in board:
#   print(row)

danger_count = 0
for row in board:
  danger_count += len(list(filter(lambda x: x > 1, row)))

print(danger_count)

