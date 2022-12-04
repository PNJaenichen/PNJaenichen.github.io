import functools

testInput = '''1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
'''

def carryCals(foods):
  return functools.reduce(lambda x, y: x + y, list(map(lambda x: int(x), foods)))

def splitElves(allCals):
  replaceLines = allCals.replace("\n\n", ";").split(";")
  return list(map(lambda x: x.splitlines(), replaceLines))

with open('PNJaenichen.github.io\\projects\\adventOfCode\\2022\\day01input.txt') as bigList:
  elves = splitElves(bigList.read())

# elves = splitElves(testInput)

calorieList = [carryCals(elf) for elf in elves]
maxElf = [index for index, item in enumerate(calorieList) if item == max(calorieList)]
print(maxElf, max(calorieList))

calorieList.sort(reverse=True)
print(functools.reduce(lambda x, y: x + y, calorieList[:3]))