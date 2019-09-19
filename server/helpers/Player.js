const { newBoard, traverseBoard } = require('./Board');
const storage = require('node-persist');
storage.init();

class Player {
    constructor(email) {
        this.email = email;
    }

    init() {
        return new Promise(async (resolve, reject) => {
            // Gets previous data, or default initial state
            const data = await storage.getItem(this.email) || {
                games: [],
                currentGame: null
            };

            // Adds attributes
            Object.assign(this, data);

            this.saveState(data);

            resolve(this);
        });
    }

    endGame() {
        if (this.currentGame) {
            this.currentGame.ended = new Date();
            this.currentGame.board.forEach(
                row => row.forEach(cell => cell.revealed = true)
            );
        }
    }

    createNewGame(config) {
        this.endGame();
        if(this.currentGame) {
            this.games.push(this.currentGame);
        }
        this.currentGame = newBoard(config);
        return this.saveState(this);
    }

    clickCell(cell) {
        cell.revealed = true;
        cell.mineMark = false;
        cell.questionMark = false;
    }

    click(x, y) {
        const cell = this.currentGame.board[y][x];

        if (cell.revealed) return;

        this.clickCell(cell);

        if (cell.mine) {
            this.endGame();
        } else if (cell.value === 0) {
            traverseBoard({ x, y }, this.currentGame.board)
                .forEach(({ x, y }) => this.click(x, y));
        }
    }

    saveState(data) {
        // Saves data
        return storage.setItem(this.email, data || this);
    }

    filter(board) {
        return board.map(
            row => row.map(cell => cell.revealed ? cell : {})
        );
    }

    hiddenBoard() {
        let games = JSON.parse(JSON.stringify(this.games));
        let currentGame = JSON.parse(JSON.stringify(this.currentGame));

        // Filter boards
        if (currentGame) {
            currentGame.board = this.filter(currentGame.board);
        }
        console.log('games',games)
        games = games.map((game) => {
            game.board = this.filter(game.board);
            return game;
        });

        return {
            games,
            currentGame,
            email: this.email
        };
    }
}

exports.Player = function (email) {
    const player = new Player(email);
    return player.init();
};
