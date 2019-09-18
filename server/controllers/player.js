const Player = require('../models/player.js');

exports.get = async (req, res) => {
    const { email } = req.params;

    const player = await Player.get(email);

    res.json(player);
};
