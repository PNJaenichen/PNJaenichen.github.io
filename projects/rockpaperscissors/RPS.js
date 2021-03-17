/* eslint-disable linebreak-style */
// This function creates the computer's pick
function computerPlay() {
  const moves = ['Rock', 'Paper', 'Scissors'];
  return moves[Math.floor(Math.random() * 3)];
}

// This function compares the player and computer choices and returns a
// winner
function playRound(playerSelection, computerSelection) {
  const playerMove = playerSelection.toLowerCase();
  const computerMove = computerSelection.toLowerCase();
  if (playerMove === computerMove) {
    return [0, 'It was a tie!'];
  }
  if (playerMove === 'rock') {
    if (computerMove === 'paper') {
      return [-1, 'You lost! Paper beats Rock!'];
    }
    return [1, 'You won! Rock beats Scissors!'];
  }
  if (playerMove === 'paper') {
    if (computerMove === 'scissors') {
      return [-1, 'You lost! Scissors beats Paper!'];
    }
    return [1, 'You won! Paper beats Rock!'];
  }
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      return [-1, 'You lost! Rock beats Scissors!'];
    }
    return [1, 'You won! Scissors beats Paper!'];
  }
  return 'Are you sure you are playing Rock, Paper, Scissors?';
}

// Initilize the score variables
let playerScore = 0;
let computerScore = 0;

// This function plays a game after the player chooses their input and
// returns the winner
function playGame(e) {
  const playerSelection = e.target.id;
  const winner = playRound(playerSelection, computerPlay());
  return winner;
}

// This function checks to see if the player or computer has 5 points
function checkForWinner() {
  if (playerScore > 4 || computerScore > 4) {
    if (playerScore > computerScore) {
      document.querySelector('#score').innerText = 'You are the Winner!';
    } else {
      document.querySelector('#score').innerText = 'Sorry, the computer has won!';
    }
    playerScore = 0;
    computerScore = 0;
  }
}

// This function updates the scores and displays them on the screen
function updateScore(val) {
  if (val > 0) {
    playerScore += 1;
  } else if (val < 0) {
    computerScore += 1;
  }
  document.querySelector('#score').innerText = `Player Score: ${playerScore}   Computer Score: ${computerScore}`;
  checkForWinner();
}
// Get the container that contains the buttons
const container = document.querySelector('#player-choice');

// Listen for a button press and then run a game, update the score, and
// update the win text
container.addEventListener('click', (e) => {
  const winner = playGame(e);
  updateScore(winner[0]);
  const winnerName = winner[1];
  document.getElementById('results').innerText = winnerName;
});
