const Person = require('../models/Person'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const { signToken, AuthenticationError } = require('../utils/auth');
const User = require('../models/User'); // Adjust the path as necessary



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
      const updatedPerson = await Person.findOneAndUpdate(
          {id: id},
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
          { new: true, upsert: true } // Return the updated document
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
        // User sign-up mutation
        signup: async (parent,args) => {
          console.log('here is the ARGS', args)
          try {
           const user =await User.create(args)
           const token = signToken(user)
           console.log({token,user})
           return {token,user}
          } catch (error) {
            console.error(error)
            throw AuthenticationError

          }
        },
    
 // User login mutation
login: async (parent, args) => {
  let user; // Declare user variable
  try {
    const { email, password } = args;

    // Find the user by email
    user = await User.findOne({ email });
    
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    // Verify password (you may need to add this step)
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      throw new AuthenticationError('Incorrect password');
    }
    
    // Generate a token
    const token = user.getSignedJwtToken(user);
    
    console.log({ token, user });
    
    return { token, user: { _id: user._id, email: user.email, username: user.username } }; // Return sanitized user object
  } catch (error) {
    console.error('Login error:', error.message);
    console.error('User:', user); // user will be undefined if the error occurs before it's defined
    throw new AuthenticationError('Error logging in user');
  
}
}

}
};

module.exports = resolvers;