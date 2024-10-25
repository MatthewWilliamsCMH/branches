const mongoose = require('mongoose');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();

    if (collections.length) {
      await mongoose.connection.db.dropCollection(collectionName);
    }
  } catch (err) {
    console.error(`Error deleting the ${collectionName} collection: `, err);
  }
};
