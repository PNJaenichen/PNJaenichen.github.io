testInput = '''vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
'''
priority_items = []

with open('PNJaenichen.github.io\\projects\\adventOfCode\\2022\\day03input.txt') as bigList:
  backpacks = bigList.read()

for pack in backpacks.splitlines():
  pri_item = None
  half_point = int(len(pack) / 2)
  first_comp, second_comp = [pack[:half_point], pack[half_point:]]
  for thing in first_comp:
    if thing in second_comp:
      pri_item = thing
  priority_items.append(pri_item)

pri_total = 0

for pri_item in priority_items:
  if pri_item.isupper():
    offset = ord(pri_item) - 38
  else:
    offset = ord(pri_item) - 96
  pri_total += offset
  
print(f'Part 1: {pri_total}')

all_group = []
grouping = []
for pack in backpacks.splitlines():
  if len(grouping) == 3:
    all_group.append(grouping)
    grouping = []
  grouping.append(pack)
all_group.append(grouping)

badge_list = []

for group in all_group:
  badge_item = None
  for thing in group[0]:
    if thing in group[1] and thing in group[2]:
      badge_item = thing
  badge_list.append(badge_item)
  
badge_total = 0

for badge in badge_list:
  if badge.isupper():
    offset = ord(badge) - 38
  else:
    offset = ord(badge) - 96
  badge_total += offset
  
print(f'Part 2: {badge_total}')