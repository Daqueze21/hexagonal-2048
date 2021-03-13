import React from 'react';

export default function Hex({size, inside, cell}) {
   let styles = {
      width: size,
      height: size,
   };
   
   return (
      <div
         className={'hexagon'}
         style={styles}
         data-x={cell.x}
         data-y={cell.y}
         data-z={cell.z}
         data-value={cell.value}>
         <div
            className='insideRadius'
            style={{ width: inside, height: inside }}>
            
         </div>
      </div>
   );
}