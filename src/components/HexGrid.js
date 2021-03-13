import React from 'react';
import Hexagon from './Hexagon';

function HexGrid(props) {
   const outsideRadius = 30;
   const insideRadius = (Math.sqrt(3) / 2) * outsideRadius;
   const blockSize = outsideRadius * 2;

   return (
     <div className='hexGrid-wrapper'>
         {props.cells.map((cell, index) => {
            return (
               <Hexagon
                  cell={cell}
                  key={index}
                  size={blockSize}
                  inside={insideRadius * 2}
               />
            );
         })}
     </div>
   );
}

export default HexGrid;
