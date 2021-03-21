import React from 'react';
// import hexagon from '../img/hexag_cell2.svg';


export default function Hex({
   size,
   cell,
   translateX,
   translateY,
   }) {
   let styles = {
      width: size,
      height: size,
      transform: `translate(${translateX}px, ${translateY}px)`,
   };
   
   return (
      <div
         className={'hexagon'}
         style={styles}
         data-x={cell.x}
         data-y={cell.y}
         data-z={cell.z}
         data-value={cell.value}>
         <div className='insideRadius'>
            {cell.value || null}
            
         </div>
      </div>
   );
}
