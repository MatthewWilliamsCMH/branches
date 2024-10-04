import { Link } from 'react-router-dom';
import image1 from '../../assets/Tree.png'
import Auth from '../../utils/auth';
import React from 'react';
import './Details.jsx'; 
    
    const Home = () => {
      return (
        <div className="home-container">
          <div className="logo">
          <img src = {image1} alt = "Tree"></img>
          </div>
          <div className="login-section">
            <h2>Login to Your Family Tree</h2>
            <form>
              <div className="form-group">
                <label htmlFor="username" >Username:</label>
                <input type="text" id="username" name="username" placeholder='Username' required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" hidden='true' required />
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
          </div>
        </div>
      );
    };
    
    export default Home;
