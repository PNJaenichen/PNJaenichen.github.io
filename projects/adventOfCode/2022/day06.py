testInput = ['bvwbjplbgvbhsrlpgdmjqwftvncz',
'nppdvjthqldpwncqszvftbrmjlhg',
'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw']

def findKey(stream):
  for i in range(3, len(stream)):
    previous = set(stream[i-3:i])
    if len(previous) == 3 and stream[i] not in previous:
      return i + 1

def startMess(stream):
  for i in range(13, len(stream)):
    previous = set(stream[i-13:i])
    if len(previous) == 13 and stream[i] not in previous:
      return i + 1

with open('day06input.txt') as f:
  fread = f.read()
  print(f'Part 1: {findKey(fread)}')
  print(f'Part 2: {startMess(fread)}')

