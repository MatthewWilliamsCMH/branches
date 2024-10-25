const db = require("../config/connection");
const Person = require("../models/Person");
const User = require("../models/User");
const personSeeds = require("./personSeeds.json");
const userSeeds = require("./userSeeds.json");
const cleanDB = require ("./cleanDB")

const seedDatabase = async () => {
  try {
    // Connect to the database
    await db.connectDB();

    // Clean the database
    await cleanDB("Person", "people");
    await cleanDB("User", "users");

    // Seed the data
    await Person.create(personSeeds);
    await User.create(userSeeds);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed: ", error);
  } finally {
    // Close the connection if necessary
    await db.connection.close();
  }
};

seedDatabase();
