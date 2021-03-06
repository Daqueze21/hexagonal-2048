// hexagon map generator
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

//find cell for changing
const findCellByCoords = (cell, grid) => {
   return grid.find(gridCell => gridCell.x === cell.x && gridCell.y === cell.y && gridCell.z === cell.z);
}

//change grid with values from server
export const populateGridWithNewValues = (existingCells, updatedCells) => {
   return existingCells.map((existingCell) => {
      const matchingCell = findCellByCoords(existingCell, updatedCells);
      
      if (!!matchingCell) {
         return matchingCell;
      }
      return existingCell;
   })
};

export const isEqualArrays = (arr1, arr2) => {
   if (arr1.length !== arr2.length) {
      return false;
   }
   const toStr = ({ x, y, z, value }) => `${x}-${y}-${z}-${value}`;
   const a1 = Array.from(arr1, toStr);
   const a2 = Array.from(arr2, toStr);
   return a1.every((item) => a2.includes(item));
};

//group gridMap by direction
const getDirectionLines = (cells, axis) => {
   const lines = {};

   cells.forEach((cell) => {
      lines[cell[axis]] = lines[cell[axis]]
         ? [...lines[cell[axis]], cell]
         : [cell];
   });

   return lines;
};

export const evaluateMove = (cells, axis, isMainDirection, sortByAxis) => {
   const lineMap = getDirectionLines(cells, axis);
   
   return Object.values(lineMap)
      .map((line) => evaluateNewLineValueSize(line, isMainDirection, sortByAxis))
      .reduce((acc, current) => acc.concat(current), []);
};

const evaluateNewLineValueSize = (line, reversedDirection, axisForSort) => {
   let lineCopy = JSON.parse(JSON.stringify(line)).sort(
      (a, b) => a[axisForSort] - b[axisForSort]
   );
   
   let numbers = [];
   lineCopy.forEach((num) => {
      if (num.value) numbers.push(num.value);
   });

   let sumNeighbors, updatedLine;

   // sum naighbors and change values
   if (reversedDirection) {
      sumNeighbors = numbers.reverse().reduce(reducer, []);

      updatedLine = lineCopy.map((obj, i, arr) => {
         if (!sumNeighbors[arr.length - 1 - i]) {
         obj.value = 0;
         } else {
         obj.value = sumNeighbors[arr.length - 1 - i];
         }
         return obj;
      });
      
   } else {
      sumNeighbors = numbers.reduce(reducer, []);

      updatedLine = lineCopy.map((obj, i) => {
         if (sumNeighbors[i]) {
         obj.value = sumNeighbors[i];
         } else {
         obj.value = 0;
         }
         return obj;
      });
   }

   return updatedLine;
};


const reducer = (acc, value, i, source) => {
   if (acc[acc.length - 1] === value && source[i - 1] === value) {
      const score = JSON.parse(localStorage.getItem('score'));
      localStorage.setItem('score', score + (value * 2));
      acc[acc.length - 1] = value * 2;
      
   } else {
      acc.push(value);
   }
   return acc;
};


export const calculateLocalChanges = (cells, keyCode) => {
   switch (keyCode) {
      case 81: //up left q
         return evaluateMove(cells, 'z', false, 'x');
      case 87: //up w
         return evaluateMove(cells, 'x', true, 'y');
      case 69: //up rigth e
         return evaluateMove(cells, 'y', true, 'x');
      case 65: //down left a
         return evaluateMove(cells, 'y', false, 'x');
      case 83: //down s
         return evaluateMove(cells, 'x', false, 'y');
      case 68: //down right d
         return evaluateMove(cells, 'z', true, 'x');
      default:
         break;
   }
};

//game ending check
const hasMovesLeft = (cells, axis, direction, axisForSort) => {
   const possibleResult = evaluateMove(cells, axis, direction, axisForSort);

   return !isEqualArrays(cells, possibleResult);
};

export const areMovesLeft = (cells) => {
   return (
      hasMovesLeft(cells, 'z', false, 'x') ||
      hasMovesLeft(cells, 'x', true, 'y') ||
      hasMovesLeft(cells, 'y', true, 'x') ||
      hasMovesLeft(cells, 'y', false, 'x') ||
      hasMovesLeft(cells, 'x', false, 'y') ||
      hasMovesLeft(cells, 'z', true, 'x')
   );
};