def figure_digits(inp):
  in_break = inp.split()
  final_digit = {1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 0: ''}
  for digit in in_break:
    if len(digit) == 2:
      final_digit[1] = digit
    if len(digit) == 3:
      final_digit[7] = digit
    if len(digit) == 4:
      final_digit[4] = digit
    if len(digit) == 7:
      final_digit[8] = digit
  for digit in in_break:
    if len(digit) == 5 and final_digit[1][0] in digit and final_digit[1][1] in digit:
      final_digit[3] = digit
  for digit in in_break:  
    if len(digit) == 6:
      if all(list(map(lambda x: x in digit, [char for char in final_digit[3]]))):
        final_digit[9] = digit
  for digit in in_break:
    if len(digit) == 5 and digit != final_digit[3]:
      if all(list(map(lambda x: x in final_digit[9], [char for char in digit]))):
        final_digit[5] = digit
      else:
        final_digit[2] = digit
  for digit in in_break:
    if len(digit) == 6 and digit != final_digit[9]:
      if all(list(map(lambda x: x in digit, [char for char in final_digit[1]]))):
        final_digit[0] = digit
      else:
        final_digit[6] = digit
  return final_digit

def break_output(code_break, out):
  out_break = out.split()
  results = ''
  for digit in out_break:
    if len(digit) == 2:
      results += '1'
    elif len(digit) == 3:
      results += '7'
    elif len(digit) == 4:
      results += '4'
    elif len(digit) == 5:
      break_digit = [char for char in digit]
      if all(list(map(lambda x: x in code_break[3], break_digit))):
        results += '3'
      elif all(list(map(lambda x: x in code_break[5], break_digit))):
        results += '5'
      else:
        results += '2'
    elif len(digit) == 6:
      break_digit = [char for char in digit]
      if all(list(map(lambda x: x in code_break[6], break_digit))):
        results += '6'
      elif all(list(map(lambda x: x in code_break[9], break_digit))):
        results += '9'
      else:
        results += '0'
    else:
      results += '8'
  return int(results)

# with open('day8test.txt') as digits:
with open('day8.txt') as digits:
  lines = []
  for i in digits.readlines():
    lines.append(i.strip().split(' | '))

one = 0
four = 0
seven = 0
eight = 0
for line in lines:
  output = line[1].split(' ')
  for digit in output:
    if len(digit) == 2:
      one += 1
    if len(digit) == 4:
      four += 1
    if len(digit) == 3:
      seven += 1
    if len(digit) == 7:
      eight += 1

print(f'There are a total of {sum([one, four, seven, eight])} 1s, 4s, 7s, and 8s in the outputs.') 

total_output = 0

for line in lines:
  total_output += break_output(figure_digits(line[0]), line[1])

print(f'The sum of the outputs is {total_output}.')