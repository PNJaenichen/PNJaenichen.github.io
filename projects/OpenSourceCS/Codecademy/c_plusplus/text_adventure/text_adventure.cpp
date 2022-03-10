#include <iostream>

/*
Storyline with beginning and three possible endings

at least three branch points, each point should provide at 
least two choices

not every branch needs its own ending, they can reconnect

incorporate at least one kind of loop
- validate user input
- give user multiple chances to choose an outcome
- continue the adventure

*/

int main() {
  int current_choice = 0;
  std::cout << "The door to the shop creaks open as you make your way in to the tiny space\n"
  "Dusty objects line the shelves and behind the counter sits two large \n"
  "containers with odd contraptions that seem to be spinning without aid. No\n"
  "one appears to be behind the counter. What would you like to do:\n\n"
  "1) Hit the bell sitting on the counter. It looks like it might work...\n"
  "2) Take a closer look at the containers behind the counter...\n";
  while (current_choice != 1 && current_choice != 2) {
    std::cin >> current_choice;
  }
  if (current_choice == 1) {
    std::cout << "The dull thud was not unexpected but still unpleasant. You wait quietly and\n"
    "then an old man appears from a door you hadn't noticed before. He moves\n"
    "slowly and then finally appears to notice you. 'Oh, hello ... err .. umm\n"
    "what can I do for you?\n\n"
    "3) Tell him you were looking for a birthday present...\n"
    "4) Tell him you really need to use the restroom...\n";
    while (current_choice != 3 && current_choice != 4) {
      std::cin >> current_choice;
    }
  } 
  if (current_choice == 2) {
    std::cout << "No sooner does your foot pass the threshhold of the counter when an old man\n"
    "appears from a door you hadn't noticed before. 'What are you doing?\n"
    "Do you work here? Get out from behind the counter! What do you want?\n\n"
    "5) Apologize profusely and tell him you were intrigued by these\n"
    "   strange containers. You ask what's in them...\n"
    "6) Apologize and state you were in need of a restroom...";
    while (current_choice != 5 && current_choice != 6) {
      std::cin >> current_choice;
    }
  }
  if (current_choice == 3) {
    std::cout << "The old man's eyes light up as if he hasn't had a customer in years \n"
    "He excitedly hauls you around the shop, wiping dust from old toys and\n"
    "blowing dust off poorly cared for leather bound books. You're running\n"
    "out of time, so you quickly make a choice between two items:\n\n"
    "7) A metal airplane toy with a slightly bent rudder... \n"
    "8) A first edition copy of 'The Hobbit' with only one coffee stain...\n";
    while (current_choice != 7 && current_choice !=8) {
      std::cin >> current_choice;
    }
  }
  if (current_choice == 7) {
    std::cout << "Somehow during the haggling process you end up paying more than \n"
    "what was on the price tag. You count your blessings it wasn't more and\n"
    "you walk out holding a wrapped, 'slightly' used new metal airplane. It\n"
    "will make your cat incredibly happy on this, their tenth birthday!\n\n"
    "The End.\n"
    "Thanks for playing!";
  }
  if (current_choice == 8) {
    std::cout << "Despite the coffee stain, you're find yourself quite content with \n"
    "the final price that you paid for the book. Your ferret will certainly\n"
    "enjoy such a literary masterpiece! What a thoughtful gift you've found.\n\n"
    "The End.\n"
    "Thanks for playing!";
  }
  if (current_choice == 5) {
    std::cout << "The old man cracks a smile the borders on creepy. He moves and\n"
    "and uncovers one of the containers. He peers inside and then gestures\n"
    "for you to take a look. The light is low and its difficult to see, so\n"
    "you lean in to take a closer inspection when you feel a strong hand\n"
    "at your back and suddenly you are tumbling in to the darkness! You\n"
    "hear a cackle that sends a shiver down your spine as you continue to\n"
    "fall and then suddenly it goes pitch black, the cackle fades, and you\n"
    "realize the the lid to the container has closed yet you're still\n"
    "falling. You start to panic and flail when suddenly ...\n\n"
    "The End.\n"
    "Thanks for playing!";
  }
  if (current_choice == 4 || current_choice == 6) {
    std::cout << "The old man pauses a moment and eyes you curiously. He raises a bony finger\n"
    "and points behind you. You slowly turn, noticing nothing but the clutter,\n"
    "but then finally see out the window across the street. There, brightly\n"
    "lit is a sign that reads: 'Public Restroom'. You thank the old man and\n"
    "head out.\n\n"
    "The End.\n"
    "Thanks for playing!";
  }
  return 0;
}