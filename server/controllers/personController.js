// server/controllers/personController.js
const Person = require('../models/Person');

// Create a new person
const createPerson = async (personData) => {
  try {
    const person = new Person(personData);
    await person.save();
    return person;
  } catch (error) {
    throw new Error('Error creating person: ' + error.message);
  }
};

// Get all persons
const getAllPersons = async () => {
  try {
    return await Person.find();
  } catch (error) {
    throw new Error('Error fetching persons: ' + error.message);
  }
};

// Get person by ID
const getPersonById = async (id) => {
  try {
    return await Person.findById(id);
  } catch (error) {
    throw new Error('Error fetching person by ID: ' + error.message);
  }
};

// Update a person by ID
const updatePerson = async (id, updates) => {
  try {
    return await Person.findByIdAndUpdate(id, updates, { new: true });
  } catch (error) {
    throw new Error('Error updating person: ' + error.message);
  }
};

// Delete a person by ID
const deletePerson = async (id) => {
  try {
    return await Person.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting person: ' + error.message);
  }
};

// Export the functions
module.exports = {
  createPerson,
  getAllPersons,
  getPersonById,
  updatePerson,
  deletePerson,
};
