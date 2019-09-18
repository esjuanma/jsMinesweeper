import React from 'react';
import './App.css';

import Player from './components/Player';
import GamesList from './components/GamesList';
import Game from './components/Game';

class App extends React.Component {

  state = {}

  onUserChange = (email) => {
    fetch(`./api/player/${email}`)
      .then(response => response.json())
      .then(player => {
        this.setState({ player });
      });
  }

  render() {
    const { player } = this.state;

    return (
      <div className="App">
        <h1>Minesweeper</h1>
        <Player onSubmit={this.onUserChange} />
        <Game state={player && player.currentGame} />
      </div>
    );
  }
}

export default App;
