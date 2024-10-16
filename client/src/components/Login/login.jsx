import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { LOGIN_MUTATION } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth'
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Error state for login failure
  const [message, setMessage] = useState(''); // Success message state
  const [protectedData, setProtectedData] = useState(null); // Store protected data
  const [login] = useMutation(LOGIN_MUTATION)

  const handleSubmit = async (e) => {
    e.preventDefault();

    
      if (!email || !password) {
        setError('All fields are required');
        return;
      }
  
      try {
       const loginResponse = await login({
        variables:{
          email:email,
          password:password
        }
       })
       
       const token = loginResponse.data.login.token
       Auth.login(token)
    } catch (error) {
      setError(error.message); // Set error message if login fails

      navigate('../myTree.jsx'); 
    }
  }

  // Fetch protected data after login (if token exists)
  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/protected', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Prefix the token with 'Bearer '
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch protected data');
          }

          const data = await response.json();
          setProtectedData(data); // Store protected data in state
          console.log('Protected data:', data);
        } catch (error) {
          console.error(error.message); // Log the error to the console
        }
      }
    };

    fetchProtectedData(); // Fetch protected data on component mount
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;