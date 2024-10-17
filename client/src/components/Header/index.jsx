import React from 'react';
import image1 from '../../assets/Tree.png';
import './Header.css';
import Auth from '../../utils/auth.js';
function Header() {
  const handleLogout = () => {
    Auth.logout();
  };
  return (
    <header className='header'>
      <div>
        Branches
        <img src={image1} alt="Tree" style={{ position: 'relative', left: '10px', bottom: '-10px' }} />
      </div>
      {/* Conditionally render sign-out button if the user is logged in */}
      {Auth.loggedIn() && (
        <button onClick={handleLogout} className="signout-btn">
          Sign Out
        </button>
      )}
    </header>
  );
}
export default Header;