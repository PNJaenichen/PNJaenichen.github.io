/* eslint-disable linebreak-style */
const boardModule = (function () {
  const gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']];

  function renderGameBoard() {
    const spaces = [
      ['topLeft', 'topCenter', 'topRight'],
      ['centerLeft', 'centerCenter', 'centerRight'],
      ['bottomLeft', 'bottomCenter', 'bottomRight']];
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        const space = document.getElementById(spaces[i][j]);
        space.textContent = gameBoard[i][j];
      }
    }
  }

  function updateGameBoard(loc, side) {
    gameBoard[loc[0]][loc[1]] = side;
    renderGameBoard();
  }

  function resetBoard() {
    document.getElementById('winScreen').style.display = 'none';
    document.getElementById('grid-container').removeEventListener('click', gameFlow.makeMove);
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        updateGameBoard([i, j], '');
      }
    }
    document.getElementById('xPlayer').textContent = '';
    document.getElementById('oPlayer').textContent = '';
    document.getElementById('pOne').value = '';
    document.getElementById('pTwo').value = '';
    document.getElementById('player-info').style.display = 'block';
    document.getElementById('startGame').style.display = 'block';
  }

  function checkForWin(pOne, pTwo) {
    const diagOne = [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]];
    const diagTwo = [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]];
    for (let i = 0; i < 3; i += 1) {
      if (gameBoard[i].every((x) => x === gameBoard[i][0]) && gameBoard[i][0] !== '') {
        if (gameBoard[i][0] === 'X') {
          return `${pOne} is the winner!`;
        }
        return `${pTwo} is the winner!`;
      }
      if (diagOne.every((x) => x === diagOne[0]) && diagOne[0] !== '') {
        if (diagOne[0] === 'X') {
          return `${pOne} is the winner!`;
        }
        return `${pTwo} is the winner!`;
      }
      if (diagTwo.every((x) => x === diagTwo[0]) && diagTwo[0] !== '') {
        if (diagTwo[0] === 'X') {
          return `${pOne} is the winner!`;
        }
        return `${pTwo} is the winner!`;
      }
      const column = [];
      for (let j = 0; j < 3; j += 1) {
        column.push(gameBoard[j][i]);
      }
      if (column.every((x) => x === column[0]) && column[0] !== '') {
        if (column[0] === 'X') {
          return `${pOne} is the winner!`;
        }
        return `${pTwo} is the winner!`;
      }
      if (gameBoard.some((x) => x.some(x === ''))) {
        return 'continue';
      }
    }
    return 'The game is a Tie';
  }
  document.getElementById('resetBoard').addEventListener('click', resetBoard);
  return {
    updateGameBoard, renderGameBoard, resetBoard, checkForWin,
  };
}());

const Player = (name, side) => {
  const getName = () => name;
  const getSide = () => side;
  return { getName, getSide };
};

// TODO create game flow object
const gameFlow = (function () {
  let playerOne;
  let playerTwo;
  let currentPlayer;
  function makeMove(e) {
    let row;
    let column;
    if (e.target.id.startsWith('top')) {
      row = 0;
    } else if (e.target.id.startsWith('center')) {
      row = 1;
    } else {
      row = 2;
    }
    if (e.target.id.endsWith('Left')) {
      column = 0;
    } else if (e.target.id.endsWith('Center')) {
      column = 1;
    } else {
      column = 2;
    }
    if (!e.target.textContent) {
      boardModule.updateGameBoard([row, column], currentPlayer.getSide());
      if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
      } else {
        currentPlayer = playerOne;
      }
    }
    const gameStatus = boardModule.checkForWin(playerOne.getName(), playerTwo.getName());
    if (gameStatus !== 'continue') {
      const ender = document.getElementById('winScreen');
      ender.firstElementChild.textContent = gameStatus;
      ender.style.display = 'flex';
      playerOne;
      playerTwo;
      currentPlayer = playerOne;
      document.getElementById('grid-container').removeEventListener('click', makeMove);
    }
  }
  document.getElementById('startGame').addEventListener('click', () => {
    playerOne = Player(document.getElementById('pOne').value, 'X');
    playerTwo = Player(document.getElementById('pTwo').value, 'O');
    document.getElementById('xPlayer').textContent = `${playerOne.getName()} - X`;
    document.getElementById('oPlayer').textContent = `${playerTwo.getName()} - O`;
    document.getElementById('player-info').style.display = 'none';
    document.getElementById('startGame').style.display = 'none';
    currentPlayer = playerOne;
    document.getElementById('grid-container').addEventListener('click', makeMove);
  });
  return { makeMove };
}());

// OPTIONAL TODO Create AI for Computer
// Start with picking legal move and then make it smart
