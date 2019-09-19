const { Player } = require('../helpers/player.js');

exports.get = async (req, res) => {   
    const { email } = req.params;
    
    const player = await Player(email);
    
    res.json(player.hiddenBoard());
};

exports.create = async (req, res) => {
    const { email, config } = req.body;

    const player = await Player(email);

    await player.createNewGame(config);

    res.json(player.hiddenBoard());
};

exports.click = async (req, res) => {
    const { email, x, y } = req.body;

    const player = await Player(email);

    player.click(x, y);

    await player.saveState();

    res.json(player.hiddenBoard());
};
