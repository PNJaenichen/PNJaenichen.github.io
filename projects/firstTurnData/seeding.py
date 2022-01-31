import random

BP_PERC = 0.09523
KIWI_PERC = 0.19048
KAIT_PERC = 0.28571
ERIC_PERC = 0.42857

print(BP_PERC + KIWI_PERC + KAIT_PERC + ERIC_PERC)

bp_places = {1: 0, 2: 0, 3: 0, 4: 0}
kiwi_places = {1: 0, 2: 0, 3: 0, 4: 0}
kait_places = {1: 0, 2: 0, 3: 0, 4: 0}
eric_places = {1: 0, 2: 0, 3: 0, 4: 0}

def create_list(s):
  name_list = []
  for _ in range(s):
    val_per = random.random()
    if val_per <= BP_PERC:
      name_list.append('bP')
    elif val_per <= (BP_PERC + KIWI_PERC):
      name_list.append('Kiwi')
    elif val_per <= (BP_PERC + KIWI_PERC + KAIT_PERC):
      name_list.append('Kait')
    else:
      name_list.append('Eric')
  return name_list

def create_order(samp):
  name_counts = {'Eric': samp.count('Eric'), 'Kait': samp.count('Kait'), 'Kiwi': samp.count('Kiwi'), 'bP': samp.count('bP')}
  print(name_counts)
  seeding = [key for (key, value) in sorted(name_counts.items(), key=lambda x: x[1], reverse=True)]
  return seeding

def create_seeding(ord):
  bp_places[ord.index('bP') + 1] += 1
  kiwi_places[ord.index('Kiwi') + 1] += 1
  kait_places[ord.index('Kait') + 1] += 1
  eric_places[ord.index('Eric') + 1] += 1
  
test = create_list(99)
test_order = create_order(test)
print(test_order)
create_seeding(test_order)

for _ in range(99):
  create_seeding(create_order(create_list(99)))
  
for i in range(1,5):
  print(i)
  
  
print(f'bP: {bp_places}')
print(f'kiwi: {kiwi_places}')
print(f'kait: {kait_places}')
print(f'eric: {eric_places}')