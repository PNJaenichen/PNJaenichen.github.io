#include <iostream>
#include <vector>

void print_board(std::vector<std::string> &spaces) {
  std::cout << " " << spaces[0] << " | " << spaces[1] << " | " << spaces[2] << " \n"; 
  std::cout << "-----------\n"; 
  std::cout << " " << spaces[3] << " | " << spaces[4] << " | " << spaces[5] << " \n";
  std::cout << "-----------\n";
  std::cout << " " << spaces[6] << " | " << spaces[7] << " | " << spaces[8] << " \n";
};

void player_choice(std::string &player, std::vector<std::string> &spaces) {
  int choice;
  std::cout << "Where would " << player << " like to play?";
  std::cin >> choice;
  spaces[choice - 1] = player;
  if (player == "X") {
    player = "O";
  } else {
    player = "X";
  }
};

bool check_win(std::vector<std::string> spaces) {
  std::vector<std::vector<int>> winning_rows = {{1, 2, 3}, {1, 5, 9}, {1, 4, 7}, {3, 5, 7}, {3, 6, 9}, {4, 5, 6}, {7, 8, 9}, {2, 5, 8}};
  for (int i = 0; i < 8; i++) {
    if (spaces[winning_rows[i][0] - 1] == spaces[winning_rows[i][1] - 1] && spaces[winning_rows[i][0] - 1] == spaces[winning_rows[i][2] - 1]) {
      std::cout << "The winning row is: {" << winning_rows[i][0] << ", " << winning_rows[i][1] << ", " << winning_rows[i][2] << "}.";
      return true;
    };
  };
  return false;
};