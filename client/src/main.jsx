import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, gql,createHttpLink } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import {setContext} from '@apollo/client/link/context'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Header from './components/Header/index.jsx'
import Footer from './components/Footer/index.jsx'
import App from './App.jsx';
import FamilyTree from './components/Tree/mytree'
import HomePage from './pages/Homepage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/Tree',
    element: <FamilyTree />
  }
  
]);

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </ApolloProvider>
);