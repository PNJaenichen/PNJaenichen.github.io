import re
import os

# Set search parameters
target_runIDs = ['3000001234']
target_serial = ['650139122480']
target_file = []

# Get current working directory
path = os.getcwd()

# list folders in directory and find Data
dir_list = os.walk(path)

# iterate through folders in Data
for file in dir_list:
  if file[0].endswith('Data'):
    data_path = file[0]
    data_subfolders = file[1]

# Find folders with indicated RunID or serial value
# could be RunID_SerialValue or RunID_Debug_SerialValue
matching_runs = []

for subfolder in data_subfolders:
  sublist = os.walk(data_path + '\\' + subfolder)
  for sub in sublist:
    if len(sub[1]) == 1 and re.search(r'(Debug)', sub[1][0]):
      folder_runID, folder_serial = sub[1][0].split('_Debug_')
      print(folder_runID in target_runIDs)

# iterate to cap folder

# all subfolders to cap and their subfolders are part of a possible variable with the file name

# pass in list of RunIDs, find relevant files, drop into folder on desktop