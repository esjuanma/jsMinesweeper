import React from 'react';
import './App.css';

import Header from './components/Header';
import Player from './components/Player';
import GamesList from './components/GamesList';
import Game from './components/Game';

class App extends React.Component {

  state = {}

  updatePlayerState = (player) => {
    this.setState({ player });
  }

  getEmail = () => {
    return this.state.player.email;
  }

  onUserChange = (email) => {
    fetch(`./api/player/${email}`)
      .then(response => response.json())
      .then(this.updatePlayerState);
  }

  createNewGame = () => {
    const email = this.getEmail();
    const rows = window.prompt('Rows:', '10');
    const columns = window.prompt('Columns:', '10');
    const mines = window.prompt('Mines:', '10');

    const config = {
      body: JSON.stringify({ email, config: { rows, columns, mines } }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(`./api/create/`, config)
      .then(response => response.json())
      .then(this.updatePlayerState);
  }

  onCellClick = ({ x, y }) => {
    const email = this.getEmail();
    const config = {
      body: JSON.stringify({ email, x, y }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(`./api/click/`, config)
      .then(response => response.json())
      .then(this.updatePlayerState);
  }

  render() {
    const { player } = this.state;

    return (
      <div className="App">
        <Header />
        <Player onSubmit={this.onUserChange} />
        {player && player.currentGame &&
          <Game game={player.currentGame} onClick={this.onCellClick} />
        }
        {player &&
          <button onClick={this.createNewGame}>Create new game</button>}
      </div>
    );
  }
}

export default App;
