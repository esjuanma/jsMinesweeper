import React from 'react';

const Game = ({ game }) => (
    <table className="game-container">
        {game.board.map(row => (
            <tr>
                {row.map(column => <td className="cell">
                    {column.mine ? '1' : '0'}
                </td>)}
            </tr>
        ))}
    </table>
);

export default Game;