import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, gql } from '@apollo/client';
import React from 'react';
import FamilyTree from './components/Tree/mytree';
import Header from './components/Header/index';
import Footer from './components/Footer/index';

// Define the Apollo Client
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

// Define the GET_PERSONS query
const GET_PERSONS = gql`
  query GetPersons {
    persons {
      id
      firstName
      lastName
      parents
      gender
      img
      dateOfBirth
      dateOfDeath
    }
  }
`;

// Create a separate component for querying and displaying data
function Persons() {
  const { loading, error, data } = useQuery(GET_PERSONS);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  // Map the fetched data to the format required by the FamilyTree component
  const nodes = data.persons.map((person, index) => ({
    //slavic was fiddling here. We think the problem is that the data being passed needs to be a number, not a string
    id: index, // person.id,
    // fid: person?.parents[0] || '', // Update as necessary, based on your family mid: tree structure
    // mid: person?.parents[1] || '',
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
        <Header /> 
        <Persons /> {/* Render the Persons component */}
        <Footer /> 
      </div>
    </ApolloProvider>
  );
}

export default App;
