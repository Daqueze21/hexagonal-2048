import React from 'react';
import { withRouter } from 'react-router';
import { NavLink, useLocation } from 'react-router-dom';

 function Header({ score }) {
   let location = useLocation();
   return (
      <div className='header'>
         <h1 className='title'>2048</h1>
         <nav className='buttons-wrapper'>
            <NavLink
               activeClassName={location.hash !== '#test2' ? null : 'selected'}
               to='/#test2'>
               2
            </NavLink>

            <NavLink
               activeClassName={location.hash !== '#test3' ? null : 'selected'}
               to='/#test3'>
               3
            </NavLink>

            <NavLink
               activeClassName={location.hash !== '#test4' ? null : 'selected'}
               to='/#test4'>
               4
            </NavLink>
         </nav>

         <div className='score-container'>{score}</div>
      </div>
   );
};
export default withRouter(Header);