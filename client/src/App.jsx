// client/src/App.jsx
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, gql,createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context'
import { Outlet } from 'react-router-dom';
import React from 'react';
import FamilyTree from './components/Tree/mytree';
import Header from '../src/components/Header/index';
import Footer from '../src/components/Footer/index';
import Homepage from '../src/pages/Homepage'

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
    <Outlet />
    <Footer /> 
    </ApolloProvider>
  );
}

export default App;