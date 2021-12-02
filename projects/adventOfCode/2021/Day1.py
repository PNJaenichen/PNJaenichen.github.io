def check_increases(checkList):
  points = len(checkList)
  increase = 0
  for i in range(0, points):
    if i >= (points - 1):
      continue
    else:
      if checkList[i] < checkList[i+1]:
        increase += 1
  return increase

# with open('day1test.txt') as measurements:
with open('day1.txt') as measurements:
  depths = []
  for i in measurements.readlines():
    depths.append(int(i.strip()))
        

windows = []
    
for i in range(0,len(depths)):
  if i >= (len(depths) - 2):
    continue
  else:  
    windows.append(depths[i] + depths[i+1] + depths[i+2])
    
print(check_increases(windows))