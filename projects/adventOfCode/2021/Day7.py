import statistics as st
from scipy import stats

def adjust_depth(start, goal):
  if start <= goal:
    return goal - start
  else:
    return start - goal

def adj_exp_depth(start, goal):
  return sum([*range(1, adjust_depth(start, goal) + 1)])

# input = "16,1,2,0,4,2,7,1,2,14"

with open('day7.txt') as fuels:
  for i in fuels.readlines():
    input = i.strip()

input = list(map(lambda x: int(x), input.split(',')))

mode, count = stats.mode(input)
mean = int(round(st.mean(input),0))
median = int(st.median(input))
print(f'The mean is {mean}, the median is {median}, and the mode is {mode[0]}')

fuel_use_median = sum(list(map(lambda x: adjust_depth(x, median), input)))
print(f'The answer to part one is {fuel_use_median}.')

fuel_use_mean = sum(list(map(lambda x: adj_exp_depth(x, mean - 1), input)))
print(f'The answer to part two is {fuel_use_mean}')



