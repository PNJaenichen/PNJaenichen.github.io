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
  
input = '''NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C'''

# with open('day14.txt') as inp_lines:
#   input = ''
#   for i in inp_lines.readlines():
#     input += i

lines = input.split('\n')

start_poly = lines[0]
pair_dict = {}
letters = []
letter_counts = []

for line in lines[2:]:
  split_line = line.strip().split(' -> ')
  pair_dict[split_line[0]] = split_line[1]
  for char in [char for char in split_line[0]]:
    if char not in letters:
      letters.append(char)

final_inp = stepPairs(start_poly, 10, pair_dict)

for char in letters:
  letter_counts.append(final_inp.count(char))

max, min = maxMinChar(list(zip(letters, letter_counts)))
print(max[1] - min[1])

