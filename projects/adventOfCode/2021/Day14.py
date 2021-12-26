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

lines = input.split('\n')

start_poly = lines[0]
pairs = []

for line in lines[2:]:
  pairs.append(tuple(line.strip().split(' -> ')))
  
for pair in pairs:
  print(pair)