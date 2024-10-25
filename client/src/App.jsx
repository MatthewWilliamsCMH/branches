// client/src/App.jsx
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
// USEQUERY AND GQL ARE NOT USED IN THIS FILE
// import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, gql,createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import React from 'react';
import { Outlet } from 'react-router-dom';
// import Homepage from '../src/pages/Homepage'; ISN'T USED IN THIS FILE
import Header from '../src/components/Header/index';
// import FamilyTree from './components/Tree/mytree'; ISN'T USED IN THIS FILE
import Footer from '../src/components/Footer/index';

const httpLink = createHttpLink ({
  uri: process.env.NODE_ENV === 'production' ? 'https://branches-bv83.onrender.com/graphql' : 'http://localhost:3001/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}`: '',
    }
  };
});

function App() {
  // useEffect(() => {
  //   client.resetStore(); // Clears the cache when the app initializes
  // }, [client]);
  return (
    <ApolloProvider client={client}>
        <Header /> 
        <Outlet />
        <Footer /> 
    </ApolloProvider>
  );
};

export default App;