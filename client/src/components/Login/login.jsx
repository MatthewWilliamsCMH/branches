import React, { useState, useEffect } from 'react'; // Ensure useEffect is imported

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Error state for login failure
  const [message, setMessage] = useState(''); // Success message state
  const [protectedData, setProtectedData] = useState(null); // Store protected data

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store token in localStorage
      setMessage('Login successful!'); // Set success message

      // Optionally, redirect the user or perform further actions here
    } catch (error) {
      setError(error.message); // Set error message if login fails
    }
  };

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
      <h2>Login</h2>
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