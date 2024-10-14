const express = require('express');
const multer = require('multer');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path') 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const cors = require('cors');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const User = require('./models/User'); // Adjust path as per your structure

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/assets/"))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

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

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.post("/assets", upload.single("avatar"), function (req, res, next) {
    res.json({ fileUrl: `/assets/${req.file.filename}` });
  });

  app.use('/graphql', expressMiddleware(server));
  app.use(express.static(path.join(__dirname, 'public')));

  //

  

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
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

      // Send the token back to the client
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Protected route example
  app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You have access to this protected route', user: req.user });
  });


  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../3client/dist/index.html'));
    });
  } 

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();