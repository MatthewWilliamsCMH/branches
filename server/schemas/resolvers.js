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
     // Protected route (you can add this to protected areas if needed)
     protectedData: async (_, args, context) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      // If authenticated, return some data or proceed with logic
      return { message: 'This is protected data!' };
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
        // User sign-up mutation
        signUp: async (_, { email, password, name }) => {
          try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
              throw new Error('User already exists');
            }
    
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create a new user
            const newUser = new User({
              email,
              password: hashedPassword,
              name
            });
    
            await newUser.save();
    
            // Generate a JWT token for the new user
            const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
              expiresIn: '1h',
            });
    
            return { token };
          } catch (error) {
            throw new Error('Error signing up user');
          }
        },
    
        // User login mutation
        login: async (_, { email, password }) => {
          try {
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
              throw new Error('User not found');
            }
    
            // Validate password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
              throw new Error('Invalid password');
            }
    
            // Generate JWT token
            const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
              expiresIn: '1h',
            });
    
            return { token };
          } catch (error) {
            throw new Error('Error logging in user');
          }
        },
      },
    };
  

module.exports = resolvers;