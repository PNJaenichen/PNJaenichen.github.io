#include <iostream>
#include <vector>
#include "tic_tac_toe_functions.hpp"

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
  std::string current_player = "X";
  print_board(player_picks);
  std::cout << "\n";
  while (check_win(player_picks) != 1) {
    player_choice(current_player, player_picks);
    print_board(player_picks);
    std::cout << "\n";
  }
  return 0;
}