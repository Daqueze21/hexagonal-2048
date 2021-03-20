import React from 'react';

export default function Footer({ status }) {
   return (
      <div className='footer'>
         <div>
            Game Status:{' '}
            <span data-status={status} className='status'>
               {status}
            </span>
         </div>

         <span className='important'>
            Use <b>q, w, e, a, s, d</b> keys for move
         </span>
      </div>
   );
}
