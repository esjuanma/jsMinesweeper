const getRandomNumber = (max) => Math.floor((Math.random() * 1000) + 1) % max;

const traverseBoard = (position, board) => {
    const { x, y } = position;
    const result = [];
    const rows = board.length;
    const columns = board[0].length;

    (x > 0) &&
        result.push(board[y][x - 1]);

    (x < columns - 1) &&
        result.push(board[y][x + 1]);

    (y > 0) &&
        result.push(board[y - 1][x]);

    (y < rows - 1) &&
        result.push(board[y + 1][x]);

    (x > 0 && y > 0) &&
        result.push(board[y - 1][x - 1]);

    (x < columns - 1 && y > 0) &&
        result.push(board[y - 1][x + 1]);

    (x > 0 && y < rows - 1) &&
        result.push(board[y + 1][x - 1]);

    (x < columns - 1 && y < rows - 1) &&
        result.push(board[y + 1][x + 1]);

    return result;
}

const plantMines = (board, config) => {
    let minesPlanted = 0;

    while (minesPlanted < config.mines) {
        const x = getRandomNumber(config.columns);
        const y = getRandomNumber(config.rows);

        if (!board[y][x].mine) {
            board[y][x].mine = true;
            minesPlanted++;
        }
    }
};

const newBoard = (config) => {
    const board = [];

    for (let y = 0; y < config.rows; y++) {
        const row = [];
        for (let x = 0; x < config.columns; x++) {
            row.push({ x, y });
        }
        board.push(row);
    }

    plantMines(board, config);

    for (let y = 0; y < config.rows; y++) {
        for (let x = 0; x < config.columns; x++) {
            const cell = board[y][x];

            if (cell.mine) continue;

            const mines = traverseBoard({x, y}, board)
                .filter(cell => Boolean(cell.mine)).length;

            cell.value = mines;
        }
    }

    return {
        board,
        started: new Date()
    };
}

exports.newBoard = newBoard;
exports.traverseBoard = traverseBoard;