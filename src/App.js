import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header';
import HexGrid from './components/HexGrid';
import Footer from './components/Footer';
import { getCellsWithValues } from './api';
import {
  generateHexagonMapByRadius,
  populateGridWithNewValues,
  calculateLocalChanges,
  isEqualArrays,
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
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleHeaderButtonsClick(radiusNumber) {
    this.initGame(radiusNumber);
  }

  async initGame(radius) {
    const cellsWithValues = await getCellsWithValues(radius, []);
    const updatedCells = populateGridWithNewValues(
      generateHexagonMapByRadius(radius - 1),
      cellsWithValues
    );
    localStorage.setItem('score', 0);  
    this.setState(() => ({
      score: 0,
      cells: updatedCells,
      gridSize: radius,
      loading: false,
      status: 'playing',
    }));
  }

  async handleKeyDown({ keyCode }) {
    const { cells, loading, status } = this.state;

    if (loading) {
      return;
    }

    //keyboard logic
    const localUpdatedCells = calculateLocalChanges(
      cells,
      keyCode
    );
    // const scoreCounter = calculatePoints(cells, localUpdatedCells);
    console.log('values', localUpdatedCells);
    if (!localUpdatedCells) {
      return;
    } else if (isEqualArrays(cells, localUpdatedCells)) {
      return;
    } else {
      const score = JSON.parse(localStorage.getItem('score'));

      this.setState({ cells: localUpdatedCells, loading: true, score: score });

      try {
        // const filteredCells = cells.filter((cell) => cell.value !== 0);
        const filteredCells = localUpdatedCells.filter(
          (cell) => cell.value !== 0
        );
        // TODO: game over logic not ready

        const cellsWithValues = await getCellsWithValues(
          this.state.gridSize,
          filteredCells
        );
        //
        const updatedCells = populateGridWithNewValues(
          localUpdatedCells,
          cellsWithValues
        );
        console.log('cells', cellsWithValues.length);

        if (cellsWithValues.length === 0) {
          this.setState({
            cells: updatedCells,
            loading: false,
            status: 'game-over',
          });
        }

        this.setState({ cells: updatedCells, loading: false });
      } catch (error) {
        console.log('hey we have a error', error);
        this.setState({ loading: false, status: 'game-over' });
      }
    }
  }

  render() {
    const { score, cells, status, gridSize, loading} = this.state;
    return (
      <div className='App'>
        <Header score={score} handleClick={this.handleHeaderButtonsClick} />
        {!cells ? (
          <div className='previewBlock'>
            <h1>Hexagonal 2048</h1>
            <h4>Push button with number to start the game</h4>
          </div>
        ) : (
          <HexGrid cells={cells} gridSize={gridSize} loading={loading} />
        )}
        <Footer status={status} />
      </div>
    );
  }
};
