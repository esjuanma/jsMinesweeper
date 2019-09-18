import React from 'react';

const GamesList = ({ games = [] }) => (
    <ul>
        {games.map(game => <li>{game.name}</li>)}
    </ul>
);

export default GamesList;