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
      <div className="flex-column justify-center align-center min-100-vh bg-primary" style = {{height: "100%"}}>
        {/*This block is sample data, not real */}
          <FamilyTree nodes={[
            { id: 1, pids: [2], name: 'Amber McKenzie', gender: 'female', img: 'https://cdn.balkan.app/shared/2.jpg'  },
            { id: 2, pids: [1], name: 'Ava Field', gender: 'male', img: 'https://cdn.balkan.app/shared/m30/5.jpg' },
            { id: 3, mid: 1, fid: 2, name: 'Peter Stevens', gender: 'male', img: 'https://cdn.balkan.app/shared/m10/2.jpg' },
            { id: 4, mid: 1, fid: 2, name: 'Savin Stevens', gender: 'male', img: 'https://cdn.balkan.app/shared/m10/1.jpg'  },
            { id: 5, mid: 1, fid: 2, name: 'Emma Stevens', gender: 'female', img: 'https://cdn.balkan.app/shared/w10/3.jpg' }
            ]} />
        {/*end of sample data */}
        <FamilyTree nodes = {nodes} />
        {/* <Outlet /> */} {/* I this is replaced by the line above */}
      </div>
    </ApolloProvider>
  );
}

export default App;
