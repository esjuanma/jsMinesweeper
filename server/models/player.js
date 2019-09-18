const storage = require('node-persist');
storage.init();

class Cell {
    setValue(value) {
        this.value = value;
    }
    setMine() {
        this.mine = true;
    }
    setRevealed() {
        this.revealed = true;
    }
    setQuestion(question) {
        this.question = question;
    }
    setMarkedMine(markedMine) {
        this.markedMine = markedMine;
    }
}

const newGame = (config) => {
    const board = [];

    for (let i = 0; i < config.columns; i++) {
        const column = [];
        for (let j = 0; j < config.rows; j++) {
            column.push(new Cell());
        }
        board.push(column);
    }

    const getRandomNumber = (max) => Math.floor((Math.random() * 1000) + 1) % max;

    let minesPlanted = 0;

    while (minesPlanted < config.mines) {
        const x = getRandomNumber(config.columns);
        const y = getRandomNumber(config.rows);
        
        if (!board[x][y].mine) {
            board[x][y].setMine();
            minesPlanted++;
        }
    }

    return {
        board,
        started: new Date()
    };
}

class Player {
    constructor(email) {
        this.email = email;
    }

    createNewGame(config) {
        if (this.currentGame) {
            this.currentGame.ended = new Date();
            this.games.push(this.currentGame);
        }

        this.currentGame = newGame(config);
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

            // Saves data
            await storage.setItem(this.email, this);

            resolve(this);
        });
    }
}

exports.Player = function (email) {
    const player = new Player(email);
    return player.init();
};
