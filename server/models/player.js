const storage = require('node-persist');
storage.init();

const newPlayer = (email) => ({
    email,
    games: [],
    currentGame: null
});

exports.get = async function (email) {
    let player = await storage.getItem(email);

    if (!player) {
        player = newPlayer(email);
        await storage.setItem(email, player);
    }

    return player;
};
