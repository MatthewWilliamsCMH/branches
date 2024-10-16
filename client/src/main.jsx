import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';

import App from './App.jsx';
import Tree from './components/Tree/mytree.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/Tree',
    element: <Tree/>
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
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