import { Link } from 'react-router-dom';
import image1 from '../../assets/Tree.png'
import Auth from '../../utils/auth';
import React from 'react';
import LoginForm from '../components/Login/login.jsx';
import SignupForm from '../components/SignUp/signup.jsx';
    
const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Family Tree App</h1>
       <img src = {image1} alt = "Tree"></img>
      <LoginForm />
      <SignupForm />
    </div>
  );
};

export default HomePage;
    

    
