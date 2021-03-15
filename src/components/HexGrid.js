import React from 'react';
import Hexagon from './Hexagon';

function HexGrid({gridSize, cells, loading}) {
   let outsideRadius = 32;
   if (gridSize === 2) {
      outsideRadius *= 2.3;
   } else if (gridSize === 3) {
      outsideRadius *= 1.5;
   }
   const insideRadius = (Math.sqrt(3) / 2) * outsideRadius + 3;
   const blockSize = outsideRadius * 2;
   let translateX = 0;
   let translateY = 0;

   return (
      <div className='hexGrid-wrapper'>
         {loading && <h4>Loading...</h4>}
         {cells.map((cell, index) => {
            translateX = insideRadius * ((3 / 2) * cell.x);
            translateY =
               insideRadius * ((Math.sqrt(3) / 2) * cell.x + Math.sqrt(3) * cell.z);

            return (
               <Hexagon
                  cell={cell}
                  key={index}
                  translateX={translateX}
                  translateY={translateY}
                  size={blockSize}
               />
            );
         })}
      </div>
   );
}

export default HexGrid;
