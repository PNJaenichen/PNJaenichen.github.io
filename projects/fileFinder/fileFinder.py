import re
import os

# Get current working directory
path = os.getcwd()

# list folders in directory and find Data
dir_list = os.walk(path)
print(dir_list)

# iterate through folders in Data
for file in dir_list:
  print(file)
  
# Find folders with indicated RunID or serial value
# could be RunID_SerialValue or RunID_Debug_SerialValue

# iterate to cap folder

# all subfolders to cap and their subfolders are part of a possible variable with the file name

# pass in list of RunIDs, find relevant files, drop into folder on desktop