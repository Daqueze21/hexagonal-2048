// TODO: hexagon map generator
export const generateHexagonMapByRadius = (radius) => {
   let hexagonMap = [];

   for (let q = -radius; q <= radius; q++) {
      let r1 = Math.max(-radius, -q - radius);
      let r2 = Math.min(radius, -q + radius);

      for (let r = r1; r <= r2; r++) {
         hexagonMap.push({ x: q, y: r, z: -q - r, value: 0 });
      }
   }

   return hexagonMap;
};



//TODO: func to fill cells map with values from server 
//TODO: keydown handler
//TODO: handle move => calculate new values(evaluete is still playing..) => send new grid values to BE => redraw with BE values
//TODO: add score counter