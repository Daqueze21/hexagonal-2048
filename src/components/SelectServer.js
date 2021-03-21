import React from 'react'

export default function SelectServer({ handleChange, serverLink }) {
   return (
      <label>
         RNG-server url:{'   '}
         <select
            id='url-server'
            value={serverLink}
            onChange={handleChange}>
            <option id='localhost' value='http://localhost:13337/'>
               Local server
            </option>
            <option
               id='remote'
               value='https://68f02c80-3bed-4e10-a747-4ff774ae905a.pub.instances.scw.cloud/'>
               Remote server
            </option>
         </select>
      </label>
   );
}
