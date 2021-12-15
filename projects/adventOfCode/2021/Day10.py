import re
import statistics

# lines = ['[({(<(())[]>[[{[]{<()<>>','[(()[<>])]({[<{<<[]>>(','{([(<{}[<>[]}>{[]{[(<()>','(((({<>}<{<{<>}{[]{[]{}','[[<[([]))<([[{}[[()]]]','[{[{({}]{}}([{[{{{}}([]','{<[[]]>}<{[{[{[]{()[[[]','[<(<(<(<{}))><([]([]()','<{([([[(<>()){}]>(<<{{','<{([{{}}[<[[[<>{}]]]>[]]']

with open('day10.txt') as syn:
  lines = []
  for i in syn.readlines():
    lines.append(i.strip())

def removePairs(str):
  count = 0
  clearStr = str
  for pair in ['()', '[]', '<>', '{}']:
    if pair in clearStr:
      clearStr = clearStr.replace(pair, '')
      count += 1
    else:
      continue    
  if count > 0:
    return removePairs(clearStr)
  else:
    return clearStr

def findInvalidPair(str):
  brace = re.search('(?<=[\(\[<])(\})', str)
  bracket = re.search('(?<=[\{\(<])(\])', str)
  para = re.search('(?<=[\[\{<])(\))', str)
  grter = re.search('(?<=[\(\[\{])(>)', str)
  if brace:
    return 1197
  elif bracket:
    return 57
  elif para:
    return 3
  elif grter:
    return 25137
  return 0

def getCompStr(str):
  comp_str = ''
  for char in reversed(str):
    if char == '(':
      comp_str += ')'
    elif char == '[':
      comp_str += ']'
    elif char == '{':
      comp_str += '}'
    elif char == '<':
      comp_str += '>'
  return comp_str

def getCompScore(str):
  comp_score = 0
  for char in str:
    comp_score *= 5
    if char == ')':
      comp_score += 1
    elif char == ']':
      comp_score += 2
    elif char == '}':
      comp_score += 3
    elif char == '>':
      comp_score += 4
  return comp_score

invalid_sum = 0
comp_scores = []

for line in lines:
  remaining_blocks = removePairs(line)
  if ')' not in remaining_blocks and ']' not in remaining_blocks and '>' not in remaining_blocks and '}' not in remaining_blocks:
    comp_scores.append(getCompScore(getCompStr(remaining_blocks)))
  else:
    invalid_sum += findInvalidPair(remaining_blocks)

print(f'The answer to part 1 is {invalid_sum}')
print(f'The answer to part 2 is {statistics.median(comp_scores)}')