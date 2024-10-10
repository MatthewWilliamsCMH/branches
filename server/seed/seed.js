const mongoose = require('mongoose');
const { createPerson, updatePerson } = require('../controllers/personController'); // Update this path as necessary
const path = require('path'); // Import the path module

async function seedDatabase() {
  // Connect to the database
  await mongoose.connect('mongodb://localhost:27017/genealogyDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create great-grandparents
  const ggGrandfather = await createPerson({
    firstName: 'Richard',
    middleName: 'John',
    lastName: 'Brown',
    dateOfBirth: '1920-01-01',
    dateOfDeath: '2000-01-01',
    gender: 'Male',
    birthPlace: 'Dublin, Ireland',
    burialSite: 'Mount Jerome Cemetery',
    img: '/assets/White Man, 50s_2.jpg', // Use path.resolve() to convert the relative path to an absolute path
    fatherId: null,
    motherId: null,
    pids: [], // Partner to Mary});

  });


  const ggGrandmother = await createPerson({
    firstName: 'Mary',
    middleName: 'Anne',
    lastName: 'Johnson',
    dateOfBirth: '1922-05-05',
    dateOfDeath: '2015-06-06',
    gender: 'Female',
    birthPlace: 'Cork, Ireland',
    burialSite: 'St. Finbarr’s Cemetery',
    img: '/assets/margaret_rose_brown.jpg', // Use path.resolve() to convert the relative path to an absolute path
    fatherId: null,
    motherId: null,
    pids: [], // Partner to Richard
  });

  await updatePerson(ggGrandfather._id, { pids: [ggGrandmother._id] });
  await updatePerson(ggGrandmother._id, { pids: [ggGrandfather._id] });

  // Create grandparents
  const gGrandfather = await createPerson({
    firstName: 'Henry',
    middleName: 'William',
    lastName: 'Brown',
    dateOfBirth: '1945-03-03',
    dateOfDeath: null,
    gender: 'Male',
    birthPlace: 'London, UK',
    burialSite: null,
    img: 'https://example.com/henry.jpg',
    fatherId: ggGrandfather._id,
    motherId: ggGrandmother._id,
    pids: [], // Partner to Evelyn
  });

  const gGrandmother = await createPerson({
    firstName: 'Evelyn',
    middleName: 'Rose',
    lastName: 'Taylor',
    dateOfBirth: '1947-08-10',
    dateOfDeath: null,
    gender: 'Female',
    birthPlace: 'London, UK',
    burialSite: null,
    img: 'https://example.com/evelyn.jpg',
    fatherId: null,
    motherId: null,
    pids: [], // Partner to Henry
  });

  // Update grandfather's pids
  await updatePerson(gGrandfather._id, { pids: [gGrandmother._id] });
  await updatePerson(gGrandmother._id, { pids: [gGrandfather._id] });

  // Create parents
  const father = await createPerson({
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
    motherId: gGrandmother._id,
    pids: [], // Partner to Jane
  });

  const mother = await createPerson({
    firstName: 'Jane',
    middleName: 'Anne',
    lastName: 'Smith',
    dateOfBirth: '1952-03-14',
    dateOfDeath: null,
    gender: 'Female',
    birthPlace: 'Edinburgh, UK',
    burialSite: null,
    img: 'https://example.com/jane.jpg',
    fatherId: null,
    motherId: null,
    pids: [], // Partner to John
  });

  // Update father's pids
  await updatePerson(father._id, { pids: [mother._id] });
  await updatePerson(mother._id, { pids: [father._id] });

  // Create individuals (children)
  const child1 = await createPerson({
    firstName: 'Amber',
    middleName: 'Louise',
    lastName: 'Brown',
    dateOfBirth: '1975-09-25',
    dateOfDeath: null,
    gender: 'Female',
    birthPlace: 'London, UK',
    burialSite: null,
    img: 'https://example.com/amber.jpg',
    fatherId: father._id,
    motherId: mother._id,
    pids: [],
  });

  const child2 = await createPerson({
    firstName: 'Ava',
    middleName: 'Grace',
    lastName: 'Brown',
    dateOfBirth: '1978-12-12',
    dateOfDeath: null,
    gender: 'Female',
    birthPlace: 'London, UK',
    burialSite: null,
    img: 'https://example.com/ava.jpg',
    fatherId: father._id,
    motherId: mother._id,
    pids: [],
  });

  // Log seeded data
  console.log('Seeding completed successfully!');

  // Close the connection
  await mongoose.connection.close();
}

// Run the seeding function
seedDatabase().catch((err) => console.error(err));