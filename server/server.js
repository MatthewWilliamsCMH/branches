// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express'); // Import Apollo Server
const typeDefs = require('./schemas/typeDefs'); // Import your type definitions
const resolvers = require('./schemas/resolvers'); // Import your resolvers

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

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

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Apply middleware to the Express app
server.applyMiddleware({ app });

// Example Route (can be removed if using only GraphQL)
app.get('/', (req, res) => {
  res.send('Welcome to the Genealogy API! Use GraphQL at /graphql');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
