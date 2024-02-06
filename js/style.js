function Gameboard() {
    const gameboard = [];
    const rows = 3;
    const cols = 3;

    for (let i = 0; i < rows; i++) {
        gameboard[i] = [];
        for (let j = 0; j < cols; j++) {
            gameboard[i][j] = null;
        }
    }

    const getGameboard = () => gameboard;

    return { getGameboard };
}

function Players() {
    const gameboard = Gameboard();
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

    return { playerOne, playerTwo };
}

function Cell() {
    const gameboard = Gameboard();
}

function Game() {
    const gameboard = Gameboard();
}
// Display array for test 
function displayGameboard() {
    const gameboard = Gameboard();
    value = 0;

    gameboard.getGameboard().forEach((rows) => {
        rows.forEach((cols) => {
            cols = value;
            console.log(value);
            value++;
        });
    });

    console.table(gameboard.getGameboard());
}

displayGameboard();