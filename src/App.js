import React, { Component } from 'react';

import GameBoard from './container/GameBoard/GameBoard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameBoard></GameBoard>
      </div>
    );
  }
}

export default App;