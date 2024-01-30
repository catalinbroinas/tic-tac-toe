function Gameboard() {
    const gameboard = [];
    const rows = 3;
    const cols = 3;

    for (let i = 0; i < rows; i++) {
        gameboard[i] = [];
        for (let j = 0; j < cols; j++) {
            gameboard[i][j] = j;
        }
    }

    const getGameboard = () => gameboard;

    return { getGameboard };
}

function Players() {
    const gameboard = Gameboard();
    const playerOne = {};
    const playerTwo = {};
}

function Cell() {
    const gameboard = Gameboard();
}

function Game() {
    const gameboard = Gameboard();
}