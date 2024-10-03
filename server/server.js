// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express'); // Import ApolloServer
const typeDefs = require('./schemas/typeDefs'); // Import typeDefs
const resolvers = require('./schemas/resolvers'); // Import resolvers

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

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo Server and apply middleware
const startServer = async () => {
  await server.start(); // Wait for the server to start
  server.applyMiddleware({ app }); // Apply middleware to the Express app

  // Example Route (replace with your actual API routes)
  app.get('/', (req, res) => {
    res.send('Welcome to the Genealogy API!');
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}${server.graphqlPath}`); // Log the GraphQL endpoint
  });
};

startServer(); // Call the startServer function
