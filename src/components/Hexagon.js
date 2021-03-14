import React from 'react';
import { getColors } from '../lib/utils';

export default function Hex({
  size,
  inside,
  cell,
  translateX,
  translateY,
  insideHeight,
  insideWidth,
}) {
  let styles = {
    width: size,
    height: size,
    transform: `translate(${translateX}px, ${translateY}px)`,
  };
  let insideBlockStyles = {
    width: insideWidth,
    height: insideHeight,
    backgroundColor: getColors(cell.value),
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
      // style={insideBlockStyles}
      >
        {cell.value || null}
      </div>
    </div>
  );
}
