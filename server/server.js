const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = []; // Temporary in-memory storage for users. Use a database in production.
const SECRET_KEY = 'your_secret_key'; // In production, use a more secure secret and store it in environment variables.

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) return res.status(403).json({ message: 'Token is required' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    
    req.user = user; // Save the user data in the request
    next(); // Proceed to the next middleware or route handler
  });
};

// Sign-up Route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = users.find(user => user.email === email);
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  // Hash the password and store the new user
  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ name, email, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user in "database"
  const user = users.find(user => user.email === email);
  if (!user) return res.status(400).json({ message: 'User not found' });

  // Compare password
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  // Generate JWT
  const token = jwt.sign({ id: user.email, name: user.name }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

// Protected Route (requires JWT)
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}! This is a protected route.` });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
