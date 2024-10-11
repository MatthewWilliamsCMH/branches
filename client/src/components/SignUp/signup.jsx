import React, { useState } from 'react';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // For error messages
  const [message, setMessage] = useState(''); // For success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (can be expanded)
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store JWT token in localStorage
      setMessage('Sign up successful! You can now log in.');
    } catch (error) {
      setError(error.message); // Set error message if sign-up fails
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
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