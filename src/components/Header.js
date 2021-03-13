import React from 'react';

export default function Header({ score, handleClick }) {
   return (
      <div className='header'>
         <h1 className='title'>2048</h1>
         <div className='buttons-wrapper'>
            <button
               onClick={() => {
                  handleClick(2);
               }}>
               2
            </button>
            <button
               onClick={() => {
                  handleClick(3);
               }}>
               3
            </button>
            <button
               onClick={() => {
                  handleClick(4);
               }}>
               4
            </button>
         </div>

         <div className='score-container'>
            {score}
         </div>
      </div>
   );
};
