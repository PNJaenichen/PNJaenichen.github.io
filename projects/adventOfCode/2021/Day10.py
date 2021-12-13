lines = ['[({(<(())[]>[[{[]{<()<>>','[(()[<>])]({[<{<<[]>>(','{([(<{}[<>[]}>{[]{[(<()>','(((({<>}<{<{<>}{[]{[]{}','[[<[([]))<([[{}[[()]]]','[{[{({}]{}}([{[{{{}}([]','{<[[]]>}<{[{[{[]{()[[[]','[<(<(<(<{}))><([]([]()','<{([([[(<>()){}]>(<<{{','<{([{{}}[<[[[<>{}]]]>[]]']

# with open('day10.txt') as syn:
#   lines = []
#   for i in syn.readlines():
#     lines.append(i.strip())

for line in lines:
  if len(line) % 2 != 0:
    print(f"There are {line.count('(')} ('s and {line.count(')')} )'s ")
    print(f"There are {line.count('[')} ['s and {line.count(']')} ]'s ")
    print(f"There are {line.count('{')} left brackets and {line.count('}')} right brackets ")
    print(f"There are {line.count('<')} <'s and {line.count('>')} >'s ")