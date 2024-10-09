const Person = require('../models/Person'); // Adjust the path as necessary

const resolvers = {
  Query: {
    persons: async () => {
      try {
        return await Person.find(); // Fetch all persons from the database
      } catch (error) {
        throw new Error('Error fetching persons');
      }
    },
    person: async (_, { id }) => {
      try {
        return await Person.findById(id); // Fetch a specific person by ID
      } catch (error) {
        throw new Error('Error fetching person');
      }
    },
  },

  Mutation: {
    createPerson: async (_, { firstName, middleName, lastName, dateOfBirth, dateOfDeath, gender, birthPlace, burialSite, img, fatherId, motherId, pids }) => {
      try {
        const newPerson = new Person({
          firstName,
          middleName,
          lastName,
          dateOfBirth,
          dateOfDeath,
          gender,
          birthPlace,
          burialSite,
          img,
          fatherId,
          motherId,
          pids,
        });

        await newPerson.save(); // Save the new person to the database
        return newPerson;
      } catch (error) {
        throw new Error('Error creating person');
      }
    },

    updatePerson: async (_, { id, firstName, middleName, lastName, dateOfBirth, dateOfDeath, gender, birthPlace, burialSite, img, fatherId, motherId, pids }) => {
      try {
        const updatedPerson = await Person.findByIdAndUpdate(
          id,
          {
            firstName,
            middleName,
            lastName,
            dateOfBirth,
            dateOfDeath,
            gender,
            birthPlace,
            burialSite,
            img,
            fatherId,
            motherId,
            pids,
          },
          { new: true } // Return the updated document
        );

        return updatedPerson; // Return the updated person
      } catch (error) {
        throw new Error('Error updating person');
      }
    },

    deletePerson: async (_, { id }) => {
      try {
        const deletedPerson = await Person.findByIdAndDelete(id); // Delete the person by ID
        return deletedPerson; // Return the deleted person
      } catch (error) {
        throw new Error('Error deleting person');
      }
    },
  },
};

module.exports = resolvers;
