// Creating the game board
function Gameboard() {
    const board = [];
    const rows = 3;
    const cols = 3;

    // Initializing the game board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const isValidMove = (row, col) => {
        return Number.isInteger(row) && 
            Number.isInteger(col) && 
            row >= 0 && row < rows && 
            col >= 0 && col < cols && 
            board[row][col].getValue() === null;
    };

    const insertMarker = (row, col, player) => {
        if (isValidMove(row, col)) {
            board[row][col].addMarker(player.marker);
            return true;
        } else {
            return false;
        }
    };

    const getBoardWithValues = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        return boardWithCellValues;
    };

    return { getBoard, insertMarker, getBoardWithValues };
}

// Defining players properties and methods
function Players() {
    let playerOneName = prompt('Set name of player one:');
    let playerTwoName = prompt('Set name of player two');

    const playerOne = {
        marker: 'X',
        name: playerOneName || 'Player One'
    };
    const playerTwo = {
        marker: '0',
        name: playerTwoName || 'Player Two'
    };

    let activePlayer = playerOne;

    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    const getPlayerNameByMarker = (byMarker) => {
        const playerName = byMarker === 'X' ? playerOne.name : playerTwo.name;
        return playerName;
    };

    return { getActivePlayer, switchActivePlayer, getPlayerNameByMarker};
}

// Defining a cell for the game board
function Cell() {
    let value = null;

    const addMarker = (marker) => {
        value = marker;
    }

    const getValue = () => value;

    return {
        addMarker,
        getValue
    };
}

function Game() {
    const board = Gameboard();
    const player = Players();
    const cell = Cell();

    const numRows  = (arr) => {
        return arr.length;
    }

    const numCols = (arr, row) => {
        return arr[row].length;
    }

    // Verify elements of row
    const checkRow = (row) => {
        if (row.length === 0) {
            return false;
        }

        const firstElement = row[0];

        if (!firstElement) {
            return false;
        }

        for (let i = 1; i < row.length; i++) {
            if (firstElement !== row[i]) {
                return false;
            }
        }

        return true;
    }

    // Verify elements of column
    const checkColumn = (arr, column) => {
        const firstElement = arr[0][column];

        if (!firstElement) {
            return false;
        }

        for (let i = 1; i < arr.length; i++) {
            if (arr[i][column] !== firstElement) {
                return false;
            }
        }

        return true;
    }

    // Verify elements of diagonals
    const checkDiagonals = (arr) => {
        const arrSize = arr.length;
        const firstElementMainDiagonal = arr[0][0];
        const firstElementSecondDiagonal = arr[0][arrSize - 1];

        let isMainDiagonalIdentical = true;
        let isSecondDiagonalIdentical = true;

        if (!firstElementMainDiagonal) {
            isMainDiagonalIdentical = false;
        }
        if (!firstElementSecondDiagonal) {
            isSecondDiagonalIdentical = false;
        }

        // VVerify main diagonal
        for (let i = 1; i < arrSize; i++) {
            if (arr[i][i] !== firstElementMainDiagonal) {
                isMainDiagonalIdentical = false;
                break;
            }
        }

        // Verify second diagonal
        for (let i = 0; i < arrSize; i++) {
            if (arr[i][arrSize - 1 - i] !== firstElementSecondDiagonal) {
                isSecondDiagonalIdentical = false;
                break;
            }
        }

        return isMainDiagonalIdentical || isSecondDiagonalIdentical;
    }

    const checkWinner = (arr) => {
        // Verify if exist a complete row
        for (let i = 0; i < numRows(arr); i++) {
            if (checkRow(arr[i])) {
                const winningMarker = arr[i][0];
                return `${player.getPlayerNameByMarker(winningMarker)} is winner!`;
            }
        }

        // Verify if exist a complete column
        for (let j = 0; j < numCols(arr, 0); j++) {
            if (checkColumn(arr, j)) {
                const winningMarker = arr[0][j];
                return `${player.getPlayerNameByMarker(winningMarker)} is winner!`;
            }
        }

        // Verify if a diagonal is complete
        if (checkDiagonals(arr)) {
            const winningMarker = arr[0][0] || arr[0][arr.length -1];
            return `${player.getPlayerNameByMarker(winningMarker)} is winner!`;
        }

        if (!arr.flat().includes(null)) {
            return 'Draw';
        }

        return null;
    };

    return {
        checkWinner
    };
}

function DisplayGame() {
    const board = Gameboard();
    const player = Players();
    const game = Game();
    const gameSect = document.querySelector('#game');
    const boardSect = document.querySelector('#game-board');
    const playerActive = document.querySelector('#active-player');

    const updateDisplay = () => {
        boardSect.innerHTML = '';

        playerActive.textContent = playRound() ? `${game.checkWinner(board.getBoardWithValues())}` :
            `${player.getActivePlayer().name} is playing.`;

        board.getBoard().forEach((row, indexOfRow) => {
            row.forEach((cell, indexOfCol) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');

                cellButton.setAttribute('type', 'button');

                cellButton.dataset.row = indexOfRow;
                cellButton.dataset.column = indexOfCol;
                cellButton.textContent = cell.getValue();
                boardSect.appendChild(cellButton);
            });
        });

        if (game.checkWinner(board.getBoardWithValues())) {
            const resetButton = document.createElement('button');
            resetButton.classList.add('btn', 'btn-reset');
            resetButton.setAttribute('type', 'button');
            resetButton.textContent = 'Reset';

            gameSect.appendChild(resetButton);

            resetButton.addEventListener('click', () => {
                location.reload();
            });
        }
    };

    const playRound = () => {
        if (game.checkWinner(board.getBoardWithValues())) {
            player.switchActivePlayer();
            boardSect.removeEventListener('click', clickOnBoard);
            return true;
        }
    };

    const isValidMove = (row, col, marker) => {
        if (board.insertMarker(row, col, marker)) {
            return true;
        } else {
            return false;
        }
    };

    const clickOnBoard = (event) => {
        let selectedRow = Number.parseInt(event.target.dataset.row);
        let selectedCol = Number.parseInt(event.target.dataset.column);
        if (isValidMove(selectedRow, selectedCol, player.getActivePlayer())) {
            playRound();
            player.switchActivePlayer();
            updateDisplay();
        }
    }

    boardSect.addEventListener('click', clickOnBoard);

    updateDisplay();
}

// window.addEventListener('load', DisplayGame);