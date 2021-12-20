from collections import defaultdict

def parseData(str):
  connections = defaultdict(list)
  for line in str.split():
    pair = line.strip().split('-')
    for p1, p2 in zip(pair, reversed(pair)):
      if p2 != 'start':
        connections[p1].append(p2)
  del connections['end']
  return connections

def part1(data, path=['start']):
  final = 0
  for point in data[path[-1]]:
    if point.isupper() or not point in path:
      final += 1 if point == 'end' else part1(data, path + [point])
  return final

def part2(data, path=['start']):
    final = 0
    for point in data[path[-1]]:
      final += 1 if point == 'end' else (part2, part1)[point.islower() and point in path](data, path + [point])
    return final

# This one has 10 routes
# lines = '''start-A
# start-b
# A-c
# A-b
# b-d
# A-end
# b-end'''

# This one has 19 routes
# lines = '''
# dc-end
# HN-start
# start-kj
# dc-start
# dc-HN
# LN-dc
# HN-end
# kj-sa
# kj-HN
# kj-dc
# '''

# This one has 226 routes
# lines = '''
# fs-end
# he-DX
# fs-he
# start-DX
# pj-DX
# end-zg
# zg-sl
# zg-pj
# pj-he
# RW-he
# fs-DX
# pj-RW
# zg-RW
# start-pj
# he-WI
# zg-he
# pj-fs
# start-RW
# '''

# This is the puzzle input
lines = '''
vn-DD
qm-DD
MV-xy
end-xy
KG-end
end-kw
qm-xy
start-vn
MV-vn
vn-ko
lj-KG
DD-xy
lj-kh
lj-MV
ko-MV
kw-qm
qm-MV
lj-kw
VH-lj
ko-qm
ko-start
MV-start
DD-ko
'''

points = parseData(lines)

print(part1(points))
print(part2(points))

