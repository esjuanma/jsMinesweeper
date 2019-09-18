const { Player } = require('../models/player.js');

exports.get = async (req, res) => {   
    const { email } = req.params;
    
    const player = await Player(email);
    
    res.json(player);
};

exports.create = async (req, res) => {
    const { email, config } = req.body;

    const player = await Player(email);

    await player.createNewGame(config);

    res.json(player);
};
