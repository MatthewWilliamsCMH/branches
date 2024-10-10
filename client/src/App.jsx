// client/src/App.jsx
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, gql } from '@apollo/client';
import React from 'react';
import FamilyTree from './components/Tree/mytree';
import Header from '../src/components/Header/index';
import Footer from '../src/components/Footer/index';

// Define the GET_PERSONS query
const GET_PERSONS = gql`
  query GetPersons {
    persons {
      id
      firstName
      middleName
      lastName
      gender
      img
      fatherId
      motherId
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
  const nodes = data.persons.map(person => ({
    id: person.id,
    pids: [person.fatherId, person.motherId].filter(pid => pid), // Parent IDs
    name: `${person.firstName} ${person.lastName}`,
    gender: person.gender,
    img: person.img || 'https://example.com/default-image.jpg', // Use the person's image or provide a default
  }));

  return <FamilyTree nodes={nodes} />;
}

function App() {
  return (
    <ApolloProvider client={client}>
    <Header /> 
    <div className="flex-column justify-center align-center min-100-vh bg-primary" style={{ height: '100%' }}>
      <Persons /> 
    </div>
    <Footer /> 
  </ApolloProvider>
  );
}

export default App;