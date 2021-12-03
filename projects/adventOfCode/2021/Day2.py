# with open('day2test.txt') as directions:
with open('day2.txt') as directions:
  moves = []
  for i in directions.readlines():
    moves.append((i.strip().split(' ')))

hor_pos = 0
depth = 0
aim = 0

for step in moves:
  match step[0]:
    case 'forward':
      hor_pos += int(step[1])
    case 'down':
      depth += int(step[1])
    case 'up':
      depth -= int(step[1])

print(hor_pos * depth)

hor_pos = 0
depth = 0
aim = 0

for step in moves:
  match step[0]:
    case 'forward':
      hor_pos += int(step[1])
      depth += int(step[1]) * aim
    case 'down':
      aim += int(step[1])
    case 'up':
      aim -= int(step[1])
      
print(hor_pos * depth)
      
