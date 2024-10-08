// server/seed/seed.js

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
      dateOfBirth: '1900-01-15',
      dateOfDeath: '1970-05-20',
      gender: 'Male',
      birthPlace: 'London, UK',
      burialSite: 'Highgate Cemetery',
      img: 'https://example.com/edward.jpg',
      fatherId: null,
      motherId: null
    });

    const ggGrandmother = await createPerson({
      firstName: 'Elizabeth',
      middleName: 'Anne',
      lastName: 'Brown',
      dateOfBirth: '1902-03-22',
      dateOfDeath: '1980-08-30',
      gender: 'Female',
      birthPlace: 'Manchester, UK',
      burialSite: 'Highgate Cemetery',
      img: 'https://example.com/elizabeth.jpg',
      fatherId: null,
      motherId: null
    });

    // Generation 2: Great-Grandparents
    const gGrandfather = await createPerson({
      firstName: 'William',
      middleName: 'James',
      lastName: 'Brown',
      dateOfBirth: '1925-07-10',
      dateOfDeath: '1995-11-05',
      gender: 'Male',
      birthPlace: 'Bristol, UK',
      burialSite: 'Highgate Cemetery',
      img: 'https://example.com/william.jpg',
      fatherId: ggGrandfather._id,
      motherId: ggGrandmother._id
    });

    const gGrandmother = await createPerson({
      firstName: 'Margaret',
      middleName: 'Rose',
      lastName: 'Brown',
      dateOfBirth: '1927-09-15',
      dateOfDeath: '2005-02-28',
      gender: 'Female',
      birthPlace: 'Bristol, UK',
      burialSite: 'Highgate Cemetery',
      img: 'https://example.com/margaret.jpg',
      fatherId: ggGrandfather._id,
      motherId: ggGrandmother._id
    });

    // Generation 3: Grandparents
    const grandfather = await createPerson({
      firstName: 'John',
      middleName: 'Paul',
      lastName: 'Brown',
      dateOfBirth: '1950-04-05',
      dateOfDeath: '2010-12-12',
      gender: 'Male',
      birthPlace: 'London, UK',
      burialSite: 'Highgate Cemetery',
      img: 'https://example.com/john.jpg',
      fatherId: gGrandfather._id,
      motherId: gGrandmother._id
    });

    const grandmother = await createPerson({
      firstName: 'Dorothy',
      middleName: 'Marie',
      lastName: 'Brown',
      dateOfBirth: '1952-06-20',
      dateOfDeath: '2015-10-10',
      gender: 'Female',
      birthPlace: 'London, UK',
      burialSite: 'Highgate Cemetery',
      img: 'https://example.com/dorothy.jpg',
      fatherId: gGrandfather._id,
      motherId: gGrandmother._id
    });

    // Generation 4: Parents
    const father = await createPerson({
      firstName: 'Michael',
      middleName: 'Andrew',
      lastName: 'Brown',
      dateOfBirth: '1975-08-30',
      dateOfDeath: null, // Still alive
      gender: 'Male',
      birthPlace: 'London, UK',
      burialSite: '',
      img: 'https://example.com/michael.jpg',
      fatherId: grandfather._id,
      motherId: grandmother._id
    });

    const mother = await createPerson({
      firstName: 'Susan',
      middleName: 'Katherine',
      lastName: 'Miller',
      dateOfBirth: '1977-11-25',
      dateOfDeath: null, // Still alive
      gender: 'Female',
      birthPlace: 'London, UK',
      burialSite: '',
      img: 'https://example.com/susan.jpg',
      fatherId: null, // Assuming no data for mother's father
      motherId: null  // Assuming no data for mother's mother
    });

    // Generation 5: Children
    const child1 = await createPerson({
      firstName: 'Emma',
      middleName: 'Grace',
      lastName: 'Brown',
      dateOfBirth: '2000-03-10',
      dateOfDeath: null, // Still alive
      gender: 'Female',
      birthPlace: 'London, UK',
      burialSite: '',
      img: 'https://example.com/emma.jpg',
      fatherId: father._id,
      motherId: mother._id
    });

    const child2 = await createPerson({
      firstName: 'Daniel',
      middleName: 'James',
      lastName: 'Brown',
      dateOfBirth: '2003-07-22',
      dateOfDeath: null, // Still alive
      gender: 'Male',
      birthPlace: 'London, UK',
      burialSite: '',
      img: 'https://example.com/daniel.jpg',
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
