import React, { Component } from 'react';
import '../App.scss';
import Header from './Header';
import HexGrid from './HexGrid';
import Footer from './Footer';
import { getCellsWithValues } from '../api';
import {
   generateHexagonMapByRadius,
   populateGridWithNewValues,
   calculateLocalChanges,
   isEqualArrays,
   areMovesLeft,
} from '../lib/utils';

export default class Game extends Component {
   constructor(props) {
      super(props);

      this.state = {
         score: 0,
         status: 'init-game',
         cells: null,
      };

      this.handleKeyDown = this.handleKeyDown.bind(this);
   }

   componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown);
   }

   componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown);
   }

   componentDidUpdate(prevProps) {
      if (prevProps.size !== this.props.size) {
         this.initGame(this.props.size);
      }
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
      } else if (status === 'init-game' || status === 'game-over') {
         return;
      }
      //keyboard logic
      const localUpdatedCells = calculateLocalChanges(cells, keyCode);

      if (!localUpdatedCells) {
         return;
      } else if (
         localUpdatedCells.every((elem) => elem.value !== 0) &&
         !areMovesLeft(localUpdatedCells)
      ) {
         this.setState({
         loading: false,
         status: 'game-over',
         });
      } else if (isEqualArrays(cells, localUpdatedCells)) {
         return;
      } else {
         const score = JSON.parse(localStorage.getItem('score'));

         this.setState({ cells: localUpdatedCells, loading: true, score: score });

         try {
         const filteredCells = localUpdatedCells.filter(
            (cell) => cell.value !== 0
         );

         const cellsWithValues = await getCellsWithValues(
            this.state.gridSize,
            filteredCells
         );
         const updatedCells = populateGridWithNewValues(
            localUpdatedCells,
            cellsWithValues
         );

         this.setState({ cells: updatedCells, loading: false });
         } catch (error) {
         console.log('hey we have a error', error);
         this.setState({ loading: false, status: 'game-over' });
         }
      }
   }

   render() {
      const { score, cells, status, gridSize, loading } = this.state;
      return (
         <div className='App'>
         <Header score={score} />
         {status === 'game-over' ? (
            <GameOver score={score} />
         ) : !cells ? (
            <PreviewBlock />
         ) : (
            <HexGrid cells={cells} gridSize={gridSize} loading={loading} />
         )}

         <Footer status={status} />
         </div>
      );
   }
}

const PreviewBlock = () => {
   return (
      <div className='previewBlock'>
         <h1>Hexagonal 2048</h1>
         <h4>Push button with number to start the game</h4>
      </div>
   );
};

const GameOver = ({ score }) => {
   return (
      <div className='gameOver'>
         <h3>Your Score:</h3>
         <div className='gameOver-score'>{score}</div>
      </div>
   );
};
