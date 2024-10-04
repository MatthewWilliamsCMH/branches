import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, gql } from '@apollo/client';
import React from 'react';
import FamilyTree from './components/Tree/mytree';

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
      gender
      img
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
  const nodes = data.persons.map(person => ({
    id: person.id,
    pids: [], // Update as necessary, based on your family tree structure
    name: `${person.firstName} ${person.lastName}`,
    gender: person.gender,
    img: person.img || 'https://example.com/default-image.jpg', // Use the person's image or provide a default
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
