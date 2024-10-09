// client/src/App.jsx
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, gql } from '@apollo/client';
import React from 'react';
import FamilyTree from './components/Tree/mytree';

// Define the GET_PERSONS query
const GET_PERSONS = gql`
  query GetPersons {
    persons {
      id
      firstName
      middleName
      lastName
      parents
      gender
      img
<<<<<<< HEAD
      dateOfBirth
      dateOfDeath
=======
      fatherId
      motherId
>>>>>>> c6d3f25d3b101dec71b54d6afabbfa62a1359718
    }
  }
`;

// Define the Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Update to your server's GraphQL endpoint
  cache: new InMemoryCache(),
});

// Create a separate component for querying and displaying data
function Persons() {
  const { loading, error, data } = useQuery(GET_PERSONS);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  // Map the fetched data to the format required by the FamilyTree component
<<<<<<< HEAD
  const nodes = data.persons.map((person, index) => ({
    //slavic was fiddling here. We think the problem is that the data being passed needs to be a number, not a string
    id: index, // person.id,
    // fid: person?.parents[0] || '', // Update as necessary, based on your family mid: tree structure
    // mid: person?.parents[1] || '',
=======
  const nodes = data.persons.map(person => ({
    id: person.id,
    pids: [person.fatherId, person.motherId].filter(pid => pid), // Parent IDs
>>>>>>> c6d3f25d3b101dec71b54d6afabbfa62a1359718
    name: `${person.firstName} ${person.lastName}`,
    dateOfBirth: person.dateOfBirth,
    dateOfDeath: person.dateOfDeath,
    gender: person.gender,
    birthPlace: person.birthPlace,
    burialSite: person.burialSite,
    motherID: person.motherId,
    fatherID: person.fatherID,
    img: person.img ? `/assets/${person.img}` : '/assets/no_photo.png',
    pids: [],
  }));
  return <FamilyTree nodes={nodes} />;
}

function App() {
  return (
    <ApolloProvider client={client} style={{ height: '100%' }}>
      <div className="flex-column justify-center align-center min-100-vh bg-primary" style={{ height: "100%" }}>
        <Persons /> {/* Render the Persons component here */}
      </div>
    </ApolloProvider>
  );
}

export default App;
