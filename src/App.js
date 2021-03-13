import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header';
import HexGrid from './components/HexGrid';
import Footer from './components/Footer';
import {
  generateHexagonMapByRadius,
} from './lib/utils';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      status: 'init-game',
      cells: null,
    };

    this.handleHeaderButtonsClick = this.handleHeaderButtonsClick.bind(this);
  }

  handleHeaderButtonsClick(radiusNumber) {
    this.initGame(radiusNumber);
  }

  initGame(radius) {
    const hexMap = generateHexagonMapByRadius(radius-1);
    console.log(hexMap);

    this.setState((state) => ({
      score: 0,
      cells: hexMap,
      gridSize: radius,
      loading: false,
      status: 'playing',
    }));
  }
  
  render() {
    const { score, cells, status, gridSize} = this.state;
    return (
      <div className='App'>
        <Header score={score} handleClick={this.handleHeaderButtonsClick} />
        {!cells ? (
          <div className='previewBlock'>
            <h1>Hexagonal 2048</h1>
            <h4>Push button with number to start the game</h4>
          </div>
        ) : (
          <HexGrid cells={cells} gridSize={gridSize} />
        )}
        <Footer status={status} />
      </div>
    );
  }
}
