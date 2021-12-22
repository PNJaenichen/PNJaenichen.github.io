import numpy as np

def findMaxes(coords):
  max_x = 0
  max_y = 0
  for coord in coords:
    if coord[0] > max_x:
      max_x = coord[0]
    if coord[1] > max_y:
      max_y = coord[1]
  return max_x, max_y

def foldHorz(fold, coords):
  new_coords = []
  for coord in coords:
    if coord[1] > fold:
      tot_diff = coord[1] - fold
      new_coords.append((coord[0], fold - tot_diff))
    else:
      new_coords.append(coord)
  return new_coords

def foldVert(fold, coords):
  new_coords = []
  for coord in coords:
    if coord[0] < fold:
      tot_diff = fold - coord[0]
      new_coords.append((fold + tot_diff, coord[1]))
    else:
      new_coords.append(coord)
  return new_coords

# lines = '''6,10
# 0,14
# 9,10
# 0,3
# 10,4
# 4,11
# 6,0
# 6,12
# 4,1
# 0,13
# 10,12
# 3,4
# 3,0
# 8,4
# 1,10
# 2,14
# 8,10
# 9,0

# fold along y=7
# fold along x=5
# '''

with open('day13.txt') as transparency:
  marks = []
  folds = []
  for i in transparency.readlines():
    if not i.startswith('fold') and i != '\n':
      x,y = i.strip().split(',')
      marks.append((int(x),int(y)))
    elif i.startswith('fold'):
      axis, val = i.split()[2].split('=')
      folds.append((axis, int(val)))

# marks = []
# folds = []
# for line in lines.split('\n'):
#   if not line.startswith('fold') and line != '':
#     x,y = line.strip().split(',')
#     marks.append((int(x),int(y)))
#   elif line.startswith('fold'):
#     axis, val = line.split()[2].split('=')
#     folds.append((axis, int(val)))

max_x, max_y = findMaxes(marks)
print(max_x, max_y)
paper = np.zeros([max_y + 1, max_x + 1])

for coord in marks:
  paper[coord[1]][coord[0]] = 1

# if folds[0][0] == 'y':
#   marks = foldHorz(folds[0][1], marks)
#   for coord in marks:
#     paper[coord[1]][coord[0]] = 1
#   paper = np.delete(paper, list(range(folds[0][1], max_y + 1)), 0)
# if folds[0][0] == 'x':
#   marks = foldVert(folds[0][1], marks)
#   for coord in marks:
#     paper[coord[1]][coord[0]] = 1
#   paper = np.delete(paper, list(range(0, folds[0][1] + 1)), 1)

# print(paper)

for fold in folds:
  print(fold)
  if fold[0] == 'y':
    marks = foldHorz(fold[1], marks)
    for coord in marks:
      paper[coord[1]][coord[0]] = 1
    paper = np.delete(paper, list(range(fold[1], max_y + 1)), 0)
  if fold[0] == 'x':
    marks = foldVert(fold[1], marks)
    for coord in marks:
      paper[coord[1]][coord[0]] = 1
    paper = np.delete(paper, list(range(0, fold[1] + 1)), 1)
  
print(paper)