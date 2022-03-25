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
  print_board(player_picks);
  int x_choice;
  std::cout << "Where would X like to play? ";
  std::cin >> x_choice;
  player_picks[x_choice - 1] = "X";
  for (int i = 0; i < 9; i++) {
    std::cout << player_picks[i];
  }
  std::cout << "\n";
  return 0;
}