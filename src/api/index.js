export const getCellsWithValues = async (gridSize, serverLink, filledCells) => {
   const requestOptions = {
      method: 'POST',
      body: JSON.stringify(filledCells),
   };

   try {
      const response = await fetch(
         `${serverLink}${gridSize}`,
         requestOptions
      ).then((resp) => resp.json());
      return response;
   } catch (error) {
      console.log('We have an ERROR', error);
   }
};
