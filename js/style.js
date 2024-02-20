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
function Players(playerOneName, playerTwoName) {
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

    return { getActivePlayer, switchActivePlayer, getPlayerNameByMarker };
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

// Defines the game logic and functions for managing the game state
function Game(playerOneName, playerTwoName) {
    const board = Gameboard();
    const player = Players(playerOneName, playerTwoName);
    const cell = Cell();

    const numRows = (arr) => {
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

    // Verify if exist a winner
    const checkWinner = (arr) => {
        // Verify if exist a complete row
        for (let i = 0; i < numRows(arr); i++) {
            if (checkRow(arr[i])) {
                const winningMarker = arr[i][0];
                return `${player.getPlayerNameByMarker(winningMarker)}`;
            }
        }

        // Verify if exist a complete column
        for (let j = 0; j < numCols(arr, 0); j++) {
            if (checkColumn(arr, j)) {
                const winningMarker = arr[0][j];
                return `${player.getPlayerNameByMarker(winningMarker)}`;
            }
        }

        // Verify if a diagonal is complete
        if (checkDiagonals(arr)) {
            const winningMarker = arr[0][0] || arr[0][arr.length - 1];
            return `${player.getPlayerNameByMarker(winningMarker)}`;
        }

        // The game board is full, but there is no a winner
        if (!arr.flat().includes(null)) {
            return 'Draw';
        }

        return null;
    };

    return {
        checkWinner
    };
}

// Handles the display and interaction of the game interface.
function DisplayGame(playerOneName, playerTwoName) {
    const board = Gameboard();
    const player = Players(playerOneName, playerTwoName);
    const game = Game(playerOneName, playerTwoName);
    const gameSect = document.querySelector('#game');
    const boardSect = document.querySelector('#game-board');
    const playerActive = document.querySelector('#active-player');

    // Update the display after each event
    const updateDisplay = () => {
        boardSect.innerHTML = '';
        boardSect.style.display = 'grid';

        playerActive.textContent = handleGameEnd() ? `${game.checkWinner(board.getBoardWithValues())}` :
            `${player.getActivePlayer().name}`;

        if (player.getActivePlayer().marker === 'X') {
            playerActive.style.cssText = 'background-color: #2979FF; display: grid;';
        }

        if (player.getActivePlayer().marker === '0') {
            playerActive.style.cssText = 'background-color: #651FFF; display: grid;';
        }

        // Display game board
        board.getBoard().forEach((row, indexOfRow) => {
            row.forEach((cell, indexOfCol) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');

                cellButton.setAttribute('type', 'button');

                cellButton.dataset.row = indexOfRow;
                cellButton.dataset.column = indexOfCol;
                cellButton.textContent = cell.getValue();

                // Change style when player two is active
                if (player.getActivePlayer().marker === '0') {
                    cellButton.addEventListener('mouseover', () => {
                        cellButton.classList.add('hovered');
                    });
                    cellButton.addEventListener('mouseout', () => {
                        cellButton.classList.remove('hovered');
                    });
                    cellButton.addEventListener('mousedown', () => {
                        cellButton.classList.add('pressed');
                    });
                    cellButton.addEventListener('mouseup', () => {
                        cellButton.classList.remove('pressed');
                    });
                }

                if (cellButton.textContent === 'X') {
                    cellButton.classList.add('mark-x');
                }

                if (cellButton.textContent === '0') {
                    cellButton.classList.add('mark-0');
                }

                if (game.checkWinner(board.getBoardWithValues())) {
                    if (!cellButton.textContent) {
                        cellButton.classList.add('empty');
                    }
                }

                boardSect.appendChild(cellButton);
            });
        });

        // After the game is over, it displays the possible actions
        if (game.checkWinner(board.getBoardWithValues())) {
            const wrapperButtons = document.createElement('div');
            const resetButton = document.createElement('button');
            const playAgainButton = document.createElement('button');

            wrapperButtons.classList.add('btn-group');
            resetButton.classList.add('btn', 'btn-reset');
            playAgainButton.classList.add('btn', 'btn-primary');

            resetButton.setAttribute('type', 'button');
            playAgainButton.setAttribute('type', 'button');

            resetButton.textContent = 'Reset';
            playAgainButton.textContent = 'Play again';

            // Style for displaying result
            if (game.checkWinner(board.getBoardWithValues()) === 'Draw') {
                playerActive.style.cssText = 'background-color: #FBFBFB; color: #304FFE; display: grid;';
            } else {
                playerActive.style.cssText = 'background-color: #14A44D; display: grid;';
            }

            gameSect.appendChild(wrapperButtons);
            wrapperButtons.appendChild(playAgainButton);
            wrapperButtons.appendChild(resetButton);

            resetButton.addEventListener('click', () => {
                location.reload();
            });
        }
    };

    // Display result and block game boar
    const handleGameEnd = () => {
        if (game.checkWinner(board.getBoardWithValues())) {
            player.switchActivePlayer();
            boardSect.removeEventListener('click', clickOnBoard);
            return true;
        }
    };

    // Verify if the marker has been inserted
    const isValidMove = (row, col, marker) => {
        if (board.insertMarker(row, col, marker)) {
            return true;
        } else {
            return false;
        }
    };

    // Handles the event when a cell on the game board is clicked
    const clickOnBoard = (event) => {
        let selectedRow = Number.parseInt(event.target.dataset.row);
        let selectedCol = Number.parseInt(event.target.dataset.column);
        if (isValidMove(selectedRow, selectedCol, player.getActivePlayer())) {
            handleGameEnd();
            player.switchActivePlayer();
            updateDisplay();
        }
    }

    boardSect.addEventListener('click', clickOnBoard);

    updateDisplay();
}

// Set names of players and start the game
function CreatePlayers() {
    const setNamesForm = document.querySelector('#set-name');
    const playerOneNameInput = document.querySelector('#player-one');
    const playerTwoNameInput = document.querySelector('#player-two');
    const applyButton = document.querySelector('#apply-btn');

    applyButton.addEventListener('click', () => {
        DisplayGame(playerOneNameInput.value, playerTwoNameInput.value);
        setNamesForm.style.display = 'none';
    });
}

window.addEventListener('load', CreatePlayers);