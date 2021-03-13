import React from 'react';
import Hexagon from './Hexagon';

function HexGrid(props) {
   let outsideRadius = 32;
   if (props.gridSize === 2) {
     outsideRadius  *= 2.3;
   } else if (props.gridSize === 3) {
     outsideRadius  *= 1.5;
   }
   const insideRadius =(Math.sqrt(3) / 2) * outsideRadius + 3 ;
   const blockSize = outsideRadius * 2;
   let translateX = 0;
   let translateY = 0;

   // console.log(props.cells);


   return (
     <div className='hexGrid-wrapper'>
         {props.cells.map((cell, index) => {
            translateX = (insideRadius) * ((3 / 2) * cell.x);
            translateY =
              (insideRadius ) *
              ((Math.sqrt(3) / 2) * cell.x + Math.sqrt(3) * cell.z);

            return (
               <Hexagon
                  cell={cell}
                  key={index}
                  translateX={translateX}
                  translateY={translateY}
                  size={blockSize}
                  inside={insideRadius * 2}
               />
            );
         })}
     </div>
   );
}

export default HexGrid;
