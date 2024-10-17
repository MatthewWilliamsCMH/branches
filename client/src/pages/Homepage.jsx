import React, { useState } from 'react';

import image1 from '../assets/Tree.png';

import Auth from '../utils/auth.js';
import LoginForm from '../components/Login/login.jsx';
import SignupForm from '../components/SignUp/signup.jsx';

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  // Toggle between login and signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <h1 style={{marginTop:'10px'}}>Welcome to Branches</h1>
      <img src={image1} alt='Tree' style={{ width: '300px', height: 'auto' }} />
      
      {/* Check if user is already authenticated */}
      {Auth.loggedIn() ? (
        <div>
          <h2>Welcome back!</h2>
         
          
        </div>
      ) : (
        <div>
          {/* Toggle button for switching between forms */}
          <button onClick={toggleForm}>
            {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>

          {/* Conditionally render login or signup form */}
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
      )}
    </div>
  );
};

export default HomePage;