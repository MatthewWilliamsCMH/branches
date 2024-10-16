import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, gql,createHttpLink } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import {setContext} from '@apollo/client/link/context'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';

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
  <RouterProvider router={router} />
  </ApolloProvider>
);

// //THIS IS THE ADAPTATION THAT CLAUDE.AI SUGGESTS; IT SEEMS TO BE CLEANER, BUT IT INSERTS THE TREE BELOW THE LOGIN PAGE
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import App from './App.jsx';

// const httpLink = createHttpLink({
//   uri: '/graphql'
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('id_token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     }
//   }
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <RouterProvider router={router} />
//     </ApolloProvider>
//   </React.StrictMode>
// );