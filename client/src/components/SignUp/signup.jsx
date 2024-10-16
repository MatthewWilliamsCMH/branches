import React, { useState } from 'react';
import { SIGNUP_MUTATION } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth'
import {Navigate} from 'react-router-dom'
import './signup.css'
const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // For error messages
  const [message, setMessage] = useState(''); // For success message
  const [signUp] = useMutation(SIGNUP_MUTATION)


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (can be expanded)
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
     const signUpResponse = await signUp({
      variables:{
        name:name,
        email:email,
        password:password
      }
     })
     
     const token = signUpResponse.data.signup.token
     Auth.login(token)

     setTimeout(()=>{
      Navigate('/Tree')
     }, 2000)

     




    } catch (error) {
      console.log(error)
      setError(error.message); // Set error message if sign-up fails
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      {message && <p style={{ color: 'green' }}>{message}</p>} {/* Display success message */}
      
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;