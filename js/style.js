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

    return { getBoard };
}

// Defining players properties and methods
function Players() {
    const playerOne = {
        marker: 'X',
        name: 'Player One',
        flowControl: true
    };
    const playerTwo = {
        marker: '0',
        name: 'Player Two',
        flowControl: false
    };

    let activePlayer = playerOne.flowControl ? playerOne : playerTwo;

    const getActivePlayer = () => activePlayer;

    return { getActivePlayer };
}

// Defining a cell for the game board
function Cell() {
    let value = null;

    const addMarker = (player) => {
        value = player;
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
}

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