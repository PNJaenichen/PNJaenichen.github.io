import numpy as np

def getMaxes(coords):
  max_X, max_Y = [0,0]
  for coord in coords:
    max_X = coord[0] if coord[0] > max_X else max_X
    max_Y = coord[1] if coord[1] > max_Y else max_Y
  return max_X, max_Y

def foldVert(fold, coords):
  new_coords = []
  for coord in coords:
    if coord[1] > fold:
      fold_dist = coord[1] - fold
      new_coords.append((coord[0], fold - fold_dist))
    else:
      new_coords.append(coord)
  return new_coords

def foldHorz(fold, coords):
  new_coords = []
  for coord in coords:
    if coord[0] > fold:
      fold_dist = coord[0] - fold
      new_coords.append((fold - fold_dist, coord[1]))
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

maxX, maxY = getMaxes(marks)

paper = np.zeros((maxY + 1, maxX + 1))
for coord in marks:
  paper[coord[1]][coord[0]] = 1

for i in range(0, len(folds)):
  fold = folds[i]
  if fold[0] == 'y':
    marks = foldVert(fold[1], marks)
    for coord in marks:
      paper[coord[1]][coord[0]] = 1
    paper = np.delete(paper, slice(fold[1], maxY + 1), 0)
  if fold[0] == 'x':
    marks = foldHorz(fold[1], marks)
    for coord in marks:
      paper[coord[1]][coord[0]] = 1
    paper = np.delete(paper, slice(fold[1], maxX + 1), 1)
  if i == 0:
    print(f'The answer to Part 1 is {np.sum(paper)}')
  maxY, maxX = paper.shape

code_paper = np.full((maxY, maxX), '.')

for coord in marks:
  code_paper[coord[1]][coord[0]] = '#'

for i in range(0, maxX, 5):
  print(code_paper[0:7, i:i + 5])
  print('')
