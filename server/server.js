// Load libraries
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const multer = require('multer');
const path = require('path') 
const cors = require('cors');
const { connectDB } = require('./config/connection');
require('dotenv').config();

// Assign port to value in .env or 3001
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;

if (!PORT) {
  throw new Error("PORT must be defined in .env file.");
};

if (!JWT_EXPIRE) {
  throw new Error("JWT_EXPIRE must be defined in .env file.");
};

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in .env file.");
};

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// Set up Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    if (token) {
      try {
        const user = jwt.verify(token, JWT_SECRET);
        return { user };
      } catch (err) {
        console.log('Invalid token');
      }
    }
    return null;
  },
});

// Set up multer to upload images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/assets/'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// Authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access Token Required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }

    req.user = user;
    next();
  });
};

// Start Apollo Server
const startApolloServer = async () => {
  await server.start();
  
  // Set up route for uploading avatar images
  app.post('/assets', upload.single('avatar'), function (req, res, next) {
    res.json({ fileUrl: `/assets/${req.file.filename}` });
  });

  // Set up middleware to capture requests that begin with /GraphQL
  app.use('/graphql', expressMiddleware(server)); //connects GraphQL to Express server
  
  // Register the path from which static assets are served; allows access to files and folders inside "public" without having to specify "public"
  app.use(express.static(path.join(__dirname, 'public')));

  // Set up route to handle login requests, process them, and send the result back to login.jsx
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find user in the database
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

      // Send the token back to the client
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Protected route called from login.jsx
  app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You have access to this protected route', user: req.user });
  });

  // if we're in production mode, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

   // Open the port
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();