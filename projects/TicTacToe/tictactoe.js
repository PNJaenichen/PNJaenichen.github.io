// Limit global code
// ROT: if you only need ONE of something (gameBoard, displayController),
// use a module. If you need multiples of something (players!), create
// them with factories

// TODO save gameboard as array in Gameboard object
var boardModule = (function() {
    let gameBoard = [
        ['','',''],
        ['','',''],
        ['','',''] ];
    function updateGameBoard(loc, side) {
        gameBoard[loc[0]][loc[1]] = side;
        renderGameBoard();
    }
    function renderGameBoard() {
        const spaces = [
            ['topLeft', 'topCenter', 'topRight'], 
            ['centerLeft', 'centerCenter', 'centerRight'], 
            ['bottomLeft', 'bottomCenter', 'bottomRight'] ];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let space = document.getElementById(spaces[i][j]);
                space.textContent = gameBoard[i][j];
            }
        }
    }
    function checkForWin() {
        const diagOne = [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]]
        const diagTwo = [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]
        console.log(diagOne);
        for (let i = 0; i < 3; i++) {
            if (gameBoard[i].every(x => x === gameBoard[i][0])) {
                return true;
            } else if (diagOne.every(x => x === diagOne[0])) {
                return true;
            } else if (diagTwo.every(x => x === diagTwo[0])) {
                return true;
            } else {
                let column = [];
                for (let j = 0; j < 3; j++) {
                    column.push(gameBoard[i][j])
                }
                if (column.every(x => x === column[0])) {
                    return true;
                }
            }
        }
        return false;
    }
    return {updateGameBoard, renderGameBoard, checkForWin}
})();

// TODO create player objects
const Player = (name, side) => {
    const getName = () => name;
    const getSide = () => side;
    return {getName, getSide}
};

// TODO create game flow object

// TODO create function to allow player to mark a spot by clicking on the
// board location, make sure it doesn't change if it's already taken

// Each function should be worked into game, player, or gameboard objects

// TODO Create logic to check for game over, win condition and ties

// TODO Create interface to take and display player name

// TODO Include start/restart button

// TODO create display element that congratulates the winning player

// OPTIONAL TODO Create AI for Computer
// Start with picking legal move and then make it smart

boardModule.renderGameBoard();
boardModule.updateGameBoard([0,0],'O');
boardModule.updateGameBoard([0,1],'O');
boardModule.updateGameBoard([0,2],'X');
boardModule.updateGameBoard([1,0],'X');
boardModule.updateGameBoard([1,1],'X');
boardModule.updateGameBoard([1,2],'O');
boardModule.updateGameBoard([2,0],'O');
boardModule.updateGameBoard([2,1],'X');
boardModule.updateGameBoard([2,2],'O');
console.log(boardModule.checkForWin());