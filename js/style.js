// Creating the game board
function Gameboard() {
    const board = [];
    const rows = 3;
    const cols = 3;
    const cell = Cell();

    // Initializing the game board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const insertMarker = (row, col, player) => {
        board[row][col] = cell.addMarker(player);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.table(boardWithCellValues);
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

    console.log(`Player is ${player.getActivePlayer().name}.`);
    player.switchActivePlayer();
    console.log(`Player is ${player.getActivePlayer().name}.`);
    player.switchActivePlayer();
    console.log(`Player is ${player.getActivePlayer().name}.`);
    player.switchActivePlayer();
    console.log(`Player is ${player.getActivePlayer().name}.`);
}

Game();

// Displaying the game board in the console
const displayGameboard = (() => {
    const board = Gameboard();
    num = 0;

    board.getBoard().forEach((rows) => {
        rows.forEach((cols) => {
            cols = num;
            console.log(num);
            num++;
        });
    });

    console.table(board.getBoard());
})();