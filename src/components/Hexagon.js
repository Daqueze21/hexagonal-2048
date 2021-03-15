import React from 'react';

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
      <div className='insideRadius' 
      >
         {cell.value || null}
         </div>
      </div>
   );
}
