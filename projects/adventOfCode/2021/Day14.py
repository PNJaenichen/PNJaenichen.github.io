def getInputPairs(in_str):
  pairs = []
  for i in range(0, len(in_str)):
    if i < len(in_str) - 1:
      pairs.append(in_str[i:i+2])
  return pairs

def getInners(inp, pair_d):
  pairs = getInputPairs(inp)
  pair_list = list(map(lambda x: [char for char in x], pairs))
  tot_pairs = len(pair_list)
  for i in range(tot_pairs):
    pair_list[i].insert(1, pair_d[''.join(pair_list[i])])
    if i != 0:
      pair_list[i].pop(0)
  return list(map(lambda x: ''.join(x), pair_list))
  
def stepPairs(inp, step, pair_d):
  new_inp = ''.join(getInners(inp, pair_d))
  if step == 1:
    return new_inp
  else:
    return stepPairs(new_inp, step - 1, pair_d)
  
def maxMinChar(counters):
  max = counters[0]
  min = counters[0]
  for count in counters[1:]:
    if count[1] > max[1]:
      max = count
    elif count[1] < min[1]:
      min = count
  return max, min
  
# input = '''NNCB

# CH -> B
# HH -> N
# CB -> H
# NH -> C
# HB -> C
# HC -> B
# HN -> C
# NN -> C
# BH -> H
# NC -> B
# NB -> B
# BN -> B
# BB -> N
# BC -> B
# CC -> N
# CN -> C'''

with open('day14.txt') as inp_lines:
  input = ''
  for i in inp_lines.readlines():
    input += i

lines = input.split('\n')

start_poly = lines[0]
pair_dict = {}
letters = []
letter_counts = []

for line in lines[2:]:
  print(line)
  split_line = line.strip().split(' -> ')
  pair_dict[split_line[0]] = split_line[1]
  for char in [char for char in split_line[0]]:
    if char not in letters:
      letters.append(char)

final_inp = stepPairs(start_poly, 10, pair_dict)

for char in letters:
  letter_counts.append(final_inp.count(char))

max, min = maxMinChar(list(zip(letters, letter_counts)))
print(f'The answer to part 1 is {max[1] - min[1]}')

singles = set()
pairs = {}
rules = {}
counts = {}

start_code = lines[0]

for line in lines[2:]:
  pair, inp = line.strip().split(' -> ')
  singles |= {pair[0], pair[1]}
  pairs[pair] = 0
  rules[pair] = inp
  
for count in singles:
  counts[count] = 0
  
for char in start_code:
  counts[char] += 1

for pair in getInputPairs(start_code):
  pairs[pair] += 1

for _ in range(40):
  new_dict = {pair:0 for pair in pairs.keys()}
  for k,v in pairs.items():
    if v > 0:
      pair_one, pair_two = [char for char in k]
      in_char = rules[k]
      new_dict[pair_one + in_char] += v
      new_dict[in_char + pair_two] += v
      counts[in_char] += v
      pairs[k] = 0
  for k,v in new_dict.items():
    pairs[k] += v

def highLow(cnt_dict):
  max = cnt_dict[list(cnt_dict.keys())[0]]
  min = cnt_dict[list(cnt_dict.keys())[0]]
  for k,v in cnt_dict.items():
    if v > max:
      max = v
    elif v < min:
      min = v
  return max, min

max, min = highLow(counts)
print(f'The answer to part 2 is {max - min}')