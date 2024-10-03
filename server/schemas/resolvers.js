// server/schemas/resolvers.js
const Person = require('../models/Person');

const resolvers = {
  Query: {
    // Resolver for fetching a single person by ID
    person: async (_, { id }) => {
      try {
        const person = await Person.findById(id);
        if (!person) {
          throw new Error('Person not found');
        }
        return person;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    
    // Resolver for fetching all persons
    persons: async () => {
      try {
        const persons = await Person.find({});
        return persons;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  
  Mutation: {
    // Resolver for adding a new person
    addPerson: async (_, args) => {
      try {
        const newPerson = new Person({
          firstName: args.firstName,
          middleName: args.middleName,
          lastName: args.lastName,
          dateOfBirth: args.dateOfBirth,
          dateOfDeath: args.dateOfDeath,
          gender: args.gender,
          birthPlace: args.birthPlace,
          burialSite: args.burialSite,
        });
        const savedPerson = await newPerson.save();
        return savedPerson;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    
    // Resolver for updating an existing person
    updatePerson: async (_, args) => {
      try {
        const { id, ...updateData } = args;
        const updatedPerson = await Person.findByIdAndUpdate(id, updateData, {
          new: true, // Return the updated document
          runValidators: true, // Ensure updated data adheres to schema
        });
        if (!updatedPerson) {
          throw new Error('Person not found');
        }
        return updatedPerson;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    
    // Resolver for deleting a person
    deletePerson: async (_, { id }) => {
      try {
        const deletedPerson = await Person.findByIdAndRemove(id);
        if (!deletedPerson) {
          throw new Error('Person not found');
        }
        return deletedPerson;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  
  // Optional: Field-level resolvers (if needed)
  // Since your current schema doesn't have nested fields or relationships,
  // you might not need additional field resolvers. However, if you add
  // relationships in the future, you can define resolvers here.
};

module.exports = resolvers;
