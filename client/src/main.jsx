import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';

import App from './App.jsx';
// import Xxx from './pages/Xxx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />,
    children: [
      // {
      //   index: true,
      //   element: <Home />
      // }
      // // , {
      //   path: '/xxx',
      //   element: <Xxx />
      // }, {
      //   path: '/xxx/:id',
      //   element: <Xxx />
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
