require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Store secret in environment variables

// Middleware
app.use(bodyParser.json()); // Use body-parser to parse JSON
app.use(express.json()); // Parse JSON request bodies

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/genealogyDB';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log(`Error connecting to MongoDB: ${err}`);
});

// Temporary in-memory storage for users (Replace with MongoDB collection in production)
const users = [];

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

// Example Route for MongoDB
app.get('/', (req, res) => {
  res.send('Welcome to the Genealogy API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
