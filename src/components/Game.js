import React, { Component } from 'react';
import '../App.scss';
import SelectServer from './SelectServer';
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
         serverLink: 'http://localhost:13337/',
         gridSize: 0,
      };

      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }

   componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown);
   }

   componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown);
   }

   componentDidUpdate(prevProps) {
      if (prevProps.size !== this.props.size) {
         this.setState(() => ({
            gridSize: this.props.size,
         }));
         this.initGame(this.props.size, this.state.serverLink);
      }
   }

   async initGame(radius, link) {
      const cellsWithValues = await getCellsWithValues(radius, link, []);
      if(!cellsWithValues) {
         this.setState(() => ({
            loading: false,
            status: 'network-unavailable',
         }));
         return
      } else{
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
      };
      
   }

   async handleKeyDown({ keyCode }) {
      const { cells, loading, status } = this.state;

      if (loading) {
         return;
      } else if (status !== 'playing') {
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

         this.setState({
            cells: localUpdatedCells,
            loading: true,
            score: score,
         });

         try {
            const filteredCells = localUpdatedCells.filter(
               (cell) => cell.value !== 0
            );

            const cellsWithValues = await getCellsWithValues(
               this.state.gridSize, this.state.serverLink,
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

   //change server handler
   handleChange(event) {
      this.setState(() => ({
         serverLink: event.target.value,
         score: 0,
         loading: false,
         status: 'playing',
      }));

      this.initGame(this.state.gridSize, event.target.value);
   }
   render() {
      const {
         score,
         cells,
         status,
         gridSize,
         loading,
         serverLink,
      } = this.state;
      return (
         <div className='App'>
            <SelectServer
               handleChange={this.handleChange}
               serverLink={serverLink}
            />
            <Header score={score} />
            {status === 'game-over' || status === 'network-unavailable' ? (
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
   let scoreBlock;
   if(!score) {
            scoreBlock =  <div className='gameOver-score'>Please change server</div>
         }else {
            scoreBlock =  <><h3>Your Score:</h3>
            <div className='gameOver-score'>{score}</div></>
         }
   return (
      <div className='gameOver'>
         
         {scoreBlock}

      </div>
   );
};
