// client/src/App.jsx
// import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, gql,createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context'
import React from 'react';
import FamilyTree from './components/Tree/mytree';
import Header from '../src/components/Header/index';
import Footer from '../src/components/Footer/index';
import Homepage from '../src/pages/Homepage'

//NOT SURE WHY THIS IS HERE; WHEN I COMMENT IT OUT, THE APP BREAKS, BUT WHEN I ADD ANOTHER PARAMETER TO PULL (LIKE BIRTHPLACE), NOTHING IN THE APP CHANGES
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

// // Define the Apollo Client
// const client = new ApolloClient({
//   uri: 'http://localhost:3000/graphql', // Update to your server's GraphQL endpoint
//   cache: new InMemoryCache(),
// });

// Create a separate component for querying and displaying data
function Persons() {
  const { loading, error, data } = useQuery(GET_PERSONS);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

//I'M NOT SURE WHY THIS IS HERE; IT DOESN'T SEEM TO DO ANYTHING, BUT WHEN I COMMENT IT OUT, THE APP BREAKS. WHEN I COMMENT OUT THE PARAMETERS, THE APP STILL WORKS
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


const httpLink= createHttpLink ({
  uri:'/graphql'
})

const authLink = setContext((_,{headers}) => {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...headers,
      authorization:token ? `bearer ${token}`: '',
    }
  }
})
const client=new ApolloClient({
  link:authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


function App() {
  return (
    <ApolloProvider client={client}>
    <Header /> 
    <Homepage/>
    <Footer /> 
  </ApolloProvider>
  );
}

export default App;