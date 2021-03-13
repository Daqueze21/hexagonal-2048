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
    };
    //keyboard logic
    const localUpdatedCells = calculateLocalChanges(cells, keyCode);

    if (!localUpdatedCells) {
      return;
    }else if (
      JSON.stringify(localUpdatedCells) === JSON.stringify(cells) &&
      status === 'playing'
    ) {
      return;
    } else {
      this.setState({ cells: localUpdatedCells, loading: true });

      const filteredCells = cells.filter((cell) => cell.value !== 0);
      // TODO: game over logic not ready

      try {
        const cellsWithValues = await getCellsWithValues(
          this.state.gridSize,
          filteredCells
        );

        const updatedCells = populateGridWithNewValues(
          localUpdatedCells,
          cellsWithValues
        );
        console.log('cells', cellsWithValues);
          // 
        if (
          cellsWithValues.length === 0 &&
          JSON.stringify(localUpdatedCells) === JSON.stringify(cells)
        ) {
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
    const { score, cells, status, gridSize } = this.state;
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
};
