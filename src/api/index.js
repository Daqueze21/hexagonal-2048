export const getCellsWithValues = async (gridSize, filledCells) => {
   const requestOptions = {
      method: 'POST',
      body: JSON.stringify(filledCells),
   };

   try {
      const response = await fetch(
         `http://51.15.207.127:13337/${gridSize}`,
         requestOptions
      ).then((resp) => resp.json());

      return response;
   } catch (error) {
      //TODO: handle request error
      console.log('We have an ERROR', error);
   }
};
