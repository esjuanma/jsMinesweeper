import React from 'react';

const Cell = ({ state, onClick }) => (
    <td className={`cell ${Object.keys(state).join(' ')}`} onClick={onClick}>
        {state.value || ''}
    </td>
);

const Game = ({ game, onClick }) => (
    <table className="game-container">
        <tbody>
            {game.board.map((row, y) => (
                <tr>
                    {row.map(
                        (cell, x) => <Cell state={cell} onClick={() => onClick({x, y})} />
                    )}
                </tr>
            ))}
        </tbody>
    </table>
);

export default Game;