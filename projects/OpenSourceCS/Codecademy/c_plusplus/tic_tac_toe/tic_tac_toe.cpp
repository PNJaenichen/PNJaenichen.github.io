#include <iostream>
#include <vector>

/*

1. Two players that will input from the same terminal

2. 3x3 game board represented using vector or array

3. 8 winning combinations

- should use a loop

- use a vector or array to hold 3x3 grid positions

- use functions to be modular

*/

int main() {
  std::vector<std::string> player_picks = {"1", "2", "3", "4", "5", "6", "7", "8", "9"};
  std::cout << " " << player_picks[0] << " | " << player_picks[1] << " | " << player_picks[2] << " \n"; 
  std::cout << "-----------\n"; 
  std::cout << " " << player_picks[3] << " | " << player_picks[4] << " | " << player_picks[5] << " \n";
  std::cout << "-----------\n";
  std::cout << " " << player_picks[6] << " | " << player_picks[7] << " | " << player_picks[8] << " \n";
  return 0;
}