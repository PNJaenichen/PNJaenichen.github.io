// This function creates the computer's pick
function computerPlay() {
    let moves = ["Rock","Paper","Scissors"];
    return moves[Math.floor(Math.random() * 3)];
}

// This function compares the player and computer choices and returns a 
// winner
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    if (playerSelection === computerSelection) {
        return [0, "It was a tie!"];
    } 
    if (playerSelection === 'rock') {
        if (computerSelection === 'paper') {
            return [-1, 'You lost! Paper beats Rock!'];
        } else {
            return [1, 'You won! Rock beats Scissors!'];
        }
    } else if (playerSelection === 'paper') {
        if (computerSelection === 'scissors') {
            return [-1, 'You lost! Scissors beats Paper!'];
        } else {
            return [1, 'You won! Paper beats Rock!'];
        }
    } else if (playerSelection === 'scissors') {
        if (computerSelection === 'rock') {
            return [-1, 'You lost! Rock beats Scissors!'];
        } else {
            return [1, 'You won! Scissors beats Paper!'];
        }
    } else {
        return 'Are you sure you are playing Rock, Paper, Scissors?';
    }
}

// Initilize the score variables
let playerScore = 0;
let computerScore = 0;

// This function plays a game after the player chooses their input and
// returns the winner
function playGame(e) {
    let playerSelection = e.target.id;
    let winner = playRound(playerSelection, computerPlay());
    return winner;
}

// This function updates the scores and displays them on the screen
function updateScore(val) {
    if (val > 0) {
        playerScore += 1;
    } else if (val < 0) {
        computerScore += 1;
    }
    document.querySelector('#score').innerText = `Player Score: ${playerScore}   Computer Score: ${computerScore}`
    checkForWinner();
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

// Get the container that contains the buttons 
const container = document.querySelector('#player-choice');

// Listen for a button press and then run a game, update the score, and
// update the win text
container.addEventListener('click', function(e) {
    let winner = playGame(e);
    updateScore(winner[0]);
    document.querySelector('#results').innerText = winner[1];
});