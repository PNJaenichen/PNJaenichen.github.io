def get_bit_list(list_o_bits):
  bit_lists = []
  n = len(list_o_bits[0])
  for i in range(0,n):
    bit_lists.append([])
  for bit in list_o_bits:
    for i in range(0,n):
      bit_lists[i].append(bit[i])
  return bit_lists

def get_gamma(list_o_bits):
  gamma = ''
  bit_lists = get_bit_list(list_o_bits)
  for bit in bit_lists:
    one_count = bit.count('1')
    zero_count = bit.count('0')
    if one_count >= zero_count:
      gamma += '1'
    else:
      gamma += '0'
  return gamma

def get_epsilon(list_o_bits):
  epsilon = ''
  bit_lists = get_bit_list(list_o_bits)
  for bit in bit_lists:
    one_count = bit.count('1')
    zero_count = bit.count('0')
    if one_count < zero_count:
      epsilon += '1'
    else:
      epsilon += '0'
  return epsilon

def get_oxygen_rating(list_o_bits):
  filtered_bits = list_o_bits
  n = len(filtered_bits[0])
  for i in range(0, n):
    total_bits = len(filtered_bits)
    if total_bits > 1:
      updated_filter = get_gamma(filtered_bits)
      filtered_bits = list(filter(lambda x: x[i] == updated_filter[i], filtered_bits))
  return filtered_bits[0]

def get_co2_scrubber_rating(list_o_bits):
  filtered_bits = list_o_bits
  n = len(filtered_bits[0])
  for i in range(0, n):
    total_bits = len(filtered_bits)
    if total_bits > 1:
      updated_filter = get_epsilon(filtered_bits)
      filtered_bits = list(filter(lambda x: x[i] == updated_filter[i], filtered_bits))
  return filtered_bits[0]

# with open('day3test.txt') as binary:
with open('day3.txt') as binary:
  bits = []
  for i in binary.readlines():
    bits.append(i.strip())
    
print(get_gamma(bits))
print(get_epsilon(bits))
print(int(get_gamma(bits), 2) * int(get_epsilon(bits), 2))
print(int(get_oxygen_rating(bits), 2) * int(get_co2_scrubber_rating(bits), 2))
