//Load library and dependencies
const mongoose = require('mongoose');
require('dotenv').config();

//Get database URI from .env file or use local
 const dbUri = process.env.NODE_ENV === "production"
  ? process.env.MONGODB_URI
  : 'mongodb://127.0.0.1:27017/genealogyDB';

//Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log("MongoDB connected.")
  }
  catch (error) {
    console.error("MongoDB connection error: ", error );
    process.exit(1);
  }
};

module.exports = { connection: mongoose.connection, connectDB };