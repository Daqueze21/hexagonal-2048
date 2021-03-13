import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header';
import HexGrid from './components/HexGrid';
import Footer from './components/Footer';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      status: 'init-game',
      cells: null
    };

    this.handleHeaderButtonsClick = this.handleHeaderButtonsClick.bind(this);
  }

  handleHeaderButtonsClick(radiusNumber) {
    console.log(radiusNumber);
    this.setState({
      cells: [
        {x: 0, y: 1, z: -1, value: 2},
      ],
    });

  }

  render() {
    const { score, cells, status } = this.state;
    return (
      <div className='App'>
        <Header score={score} handleClick={this.handleHeaderButtonsClick} />
        {!cells ? (
          <div className='previewBlock'>
            <h1>Hexagonal 2048</h1>
            <h4>Push button with number to start the game</h4>
          </div>
        ) : (
          <HexGrid cells={cells} />
        )}
        <Footer status={status} />
      </div>
    );
  }
}
