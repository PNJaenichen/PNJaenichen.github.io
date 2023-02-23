testInput = '''$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k'''

bigList = testInput.splitlines()
cur_dir = '/'
file_structure = {'/': {'base': []}}

for line in bigList:
  if line.startswith('$'):
    if 'cd' in line:
      if '..' in line:
        cur_dir = '/'.join(cur_dir.split('/')[:-2])
        if cur_dir == '':
          cur_dir = '/' 
      elif line[-1] in cur_dir:
        if len(cur_dir) == 1:
          continue
        else:
          cur_dir = '/'
      else:
        cur_dir = cur_dir + line[-1] + '/'
      print(cur_dir)
  else:
    