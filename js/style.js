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

    const insertMarker = (row, col, player) => {
        board[row][col].getValue() === null ? board[row][col].addMarker(player.marker) : console.log('This cell is not available!');;
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.table(boardWithCellValues);
        return boardWithCellValues;
    };

    return { getBoard, insertMarker, printBoard };
}

// Defining players properties and methods
function Players() {
    const playerOne = {
        marker: 'X',
        name: 'Player One'
    };
    const playerTwo = {
        marker: '0',
        name: 'Player Two'
    };

    let activePlayer = playerOne;

    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    return { getActivePlayer, switchActivePlayer };
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

    function numRows(arr) {
        return arr.length;
    }

    function areAllElementsIdentical(row) {
        if (row.length === 0) {
            return false;
        }

        const firstElement = row[0];

        for (let i = 0; i < row.length; i++) {
            if (firstElement !== row[i]) {
                return false;
            }
        }

        return true;
    }

    function checkWinner(arr) {
        for (let i = 0; i < numRows(arr); i++) {
            if (areAllElementsIdentical(arr[i])) {
                if (arr[i][0] == 'X') {
                    return 'X is winner';
                } else if (arr[i][0] == '0') {
                    return 'Zero is winner';
                }
            }
        }
        
        if (!arr.flat().includes(null)) {
            return 'Draw';
        }

        return null;
    }
    
    let winner = null;

    while (winner === null) {
        console.log(`Player is ${player.getActivePlayer().name}.`);
        let row = prompt('Index of row');
        let col = prompt('Index of column');
        board.insertMarker(row, col, player.getActivePlayer());
        board.printBoard();
        player.switchActivePlayer();

        winner = checkWinner(board.printBoard());

        if (winner) {
            console.log(winner);
            break;
        }
    }

    console.log('Finale game');
}

Game();