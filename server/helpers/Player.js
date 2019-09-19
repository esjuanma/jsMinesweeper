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
            this.games.push(this.currentGame);
        }
    }

    createNewGame(config) {
        this.endGame();
        this.currentGame = newBoard(config);
        return this.saveState(this);
    }

    click(x, y) {
        const cell = this.currentGame.board[y][x];
        cell.revealed = true;
        cell.mineMark = false;
        cell.questionMark = false;

        if (cell.mine) {
            this.endGame();
        }

        return this.saveState(this);
    }

    saveState(data) {
        // Saves data
        return storage.setItem(this.email, data);
    }
}

exports.Player = function (email) {
    const player = new Player(email);
    return player.init();
};
