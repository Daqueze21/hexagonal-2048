export const getCellsWithValues = async (gridSize, filledCells) => {
   const requestOptions = {
      method: 'POST',
      body: JSON.stringify(filledCells),
   };

   try {
      const response = await fetch(
         `https://68f02c80-3bed-4e10-a747-4ff774ae905a.pub.instances.scw.cloud/${gridSize}`,
         requestOptions
      ).then((resp) => resp.json());

      return response;
   } catch (error) {
      console.log('We have an ERROR', error);
   }
};
