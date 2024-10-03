import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { Component } from 'react';
import FamilyTree from './components/Tree/mytree';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const nodes = [
    { id: 1, pids: [2], name: 'Amber McKenzie', gender: 'female', img: 'https://cdn.balkan.app/shared/2.jpg' },
    //objects get inserted here?
];
  return (
    <ApolloProvider client={client} style = {{height: '100%'}}>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <FamilyTree nodes = {nodes} />
        {/* <Outlet /> */} {/* I this is replaced by the line above */}
      </div>
    </ApolloProvider>
  );
}

export default App;
