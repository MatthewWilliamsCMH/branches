const express = require('express');
const multer = require('multer');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
// const cors = require('cors');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
require('dotenv').config();


const PORT = process.env.PORT || 3001;
const app = express();

// app.use(cors());

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
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.post("/assets", upload.single("avatar"), function (req, res, next) {
    res.json({ fileUrl: `/assets/${req.file.filename}` });
  });

  app.use('/graphql', expressMiddleware(server));
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', (req, res) => {
    res.send('Welcome to the API');
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();