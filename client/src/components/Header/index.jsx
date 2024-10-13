import React from 'react';
import image1 from '../../assets/Tree.png'
import "./Header.css"



function Header() {
  return (
    <header className='header'>
        
        <div>Branches 
          <img src= {image1} style={{ position: 'relative', left: '10px', bottom: '-10px' }}/>
        </div>
        

    </header>
  )
}

export default Header;