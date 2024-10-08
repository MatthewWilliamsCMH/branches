// seed/seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('../models/Person');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/genealogyDB';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB for seeding.');
  seedDatabase();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

async function seedDatabase() {
  try {
    // Clear existing data
    await Person.deleteMany({});
    console.log('Cleared existing Person data.');

    // Helper function to create a person
    async function createPerson(personData) {
      const person = new Person(personData);
      await person.save();
      return person;
    }

    // Generation 1: Great-Great-Grandparents
    const ggGrandfather = await createPerson({
      firstName: 'Edward',
      middleName: 'Henry',
      lastName: 'Brown',
      dateOfBirth: new Date('1900-01-15'),
      dateOfDeath: new Date('1970-05-20'),
      gender: 'Male',
      birthPlace: 'London, UK',
      burialSite: 'Highgate Cemetery',
      // No parents
      motherId: null,
      fatherId: null,
      img: "daniel_james_brown.jpg"
    });

    const ggGrandmother = await createPerson({
      firstName: 'Elizabeth',
      middleName: 'Anne',
      lastName: 'Brown',
      dateOfBirth: new Date('1902-03-22'),
      dateOfDeath: new Date('1980-08-30'),
      gender: 'Female',
      birthPlace: 'Manchester, UK',
      burialSite: 'Highgate Cemetery',
      // No parents
      motherId: null,
      fatherId: null
    });

    // Generation 2: Great-Grandparents
    const gGrandfather = await createPerson({
      firstName: 'William',
      middleName: 'James',
      lastName: 'Brown',
      dateOfBirth: new Date('1925-07-10'),
      dateOfDeath: new Date('1995-11-05'),
      gender: 'Male',
      birthPlace: 'Bristol, UK',
      burialSite: 'Highgate Cemetery',
      fatherId: ggGrandfather._id, // Father's father
      motherId: ggGrandmother._id  // Father's mother
    });

    const gGrandmother = await createPerson({
      firstName: 'Margaret',
      middleName: 'Rose',
      lastName: 'Brown',
      dateOfBirth: new Date('1927-09-15'),
      dateOfDeath: new Date('2005-02-28'),
      gender: 'Female',
      birthPlace: 'Bristol, UK',
      burialSite: 'Highgate Cemetery',
      fatherId: ggGrandfather._id, // Mother's father
      motherId: ggGrandmother._id  // Mother's mother
    });

    // Generation 3: Grandparents
    const grandfather = await createPerson({
      firstName: 'John',
      middleName: 'Paul',
      lastName: 'Brown',
      dateOfBirth: new Date('1950-04-05'),
      dateOfDeath: new Date('2010-12-12'),
      gender: 'Male',
      birthPlace: 'London, UK',
      burialSite: 'Highgate Cemetery',
      fatherId: gGrandfather._id, // Father's father
      motherId: gGrandmother._id,  // Father's mother
    });

    const grandmother = await createPerson({
      firstName: 'Dorothy',
      middleName: 'Marie',
      lastName: 'Brown',
      dateOfBirth: new Date('1952-06-20'),
      dateOfDeath: new Date('2015-10-10'),
      gender: 'Female',
      birthPlace: 'London, UK',
      burialSite: 'Highgate Cemetery',
      fatherId: gGrandfather._id, // Mother's father
      motherId: gGrandmother._id  // Mother's mother
    });

    // Generation 4: Parents
    const father = await createPerson({
      firstName: 'Michael',
      middleName: 'Andrew',
      lastName: 'Brown',
      dateOfBirth: new Date('1975-08-30'),
      dateOfDeath: null, // Still alive
      gender: 'Male',
      birthPlace: 'London, UK',
      burialSite: '',
      fatherId: grandfather._id, // Father's father
      motherId: grandmother._id  // Father's mother
    });

    const mother = await createPerson({
      firstName: 'Susan',
      middleName: 'Katherine',
      lastName: 'Miller',
      dateOfBirth: new Date('1977-11-25'),
      dateOfDeath: null, // Still alive
      gender: 'Female',
      birthPlace: 'London, UK',
      burialSite: '',
      fatherId: null, // Assuming no data for mother's father
      motherId: null  // Assuming no data for mother's mother
    });

    // Generation 5: Children
    const child1 = await createPerson({
      firstName: 'Emma',
      middleName: 'Grace',
      lastName: 'Brown',
      dateOfBirth: new Date('2000-03-10'),
      dateOfDeath: null, // Still alive
      gender: 'Female',
      birthPlace: 'London, UK',
      burialSite: '',
      fatherId: father._id,
      motherId: mother._id
    });

    const child2 = await createPerson({
      firstName: 'Daniel',
      middleName: 'James',
      lastName: 'Brown',
      dateOfBirth: new Date('2003-07-22'),
      dateOfDeath: null, // Still alive
      gender: 'Male',
      birthPlace: 'London, UK',
      burialSite: '',
      fatherId: father._id,
      motherId: mother._id
    });

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}


// Should we create two trees so that we can show that different trees load for different users?
// Should the married women have their maiden names instead of their married names?