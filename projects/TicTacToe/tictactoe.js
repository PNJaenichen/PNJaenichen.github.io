// Limit global code
// ROT: if you only need ONE of something (gameBoard, displayController),
// use a module. If you need multiples of something (players!), create
// them with factories

// TODO save gameboard as array in Gameboard object
const Gameboard = () => {
    let topRow = ["","",""];
    let middleRow = ["","",""];
    let bottomRow = ["","",""];
    return {topRow, middleRow, bottomRow}
};

// TODO create player objects
const Player = (name, side) => {
    const getName = () => name;
    const getSide = () => side;
    return {getName, getSide}
};

// TODO create game flow object

// TODO Create HTML and JS to render the gameboard array

// TODO create function to allow player to mark a spot by clicking on the
// board location, make sure it doesn't change if it's already taken

// Each function should be worked into game, player, or gameboard objects

// TODO Create logic to check for game over, win condition and ties
function checkForWin(board) {
    const boardState = [board.topRow, board.middleRow, board.bottomRow];
    const diagOne = [boardState[0][0], boardState[1][1], boardState[2,2]]
    const diagTwo = [boardState[0][2], boardState[1][1], boardState[2,0]]
    for (let i = 0; i < 3; i++) {
        if (boardState[i].every(x => x === boardState[i][0])) {
            return true;
        } else if (diagOne.every(x => x === diagOne[0])) {
            return true;
        } else if (diagTwo.every(x => x === diagTwo[0])) {
            return true;
        } else {
            let column = [];
            for (let j = 0; j < 3; j++) {
                column.push(boardState[i][j])
            }
            if (column.every(x => x === x[0])) {
                return true;
            }
        }
    }
    return false;
}
// TODO Create interface to take and display player name

// TODO Include start/restart button

// TODO create display element that congratulates the winning player

// OPTIONAL TODO Create AI for Computer
// Start with picking legal move and then make it smart

var gameBoard = Gameboard();