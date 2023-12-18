import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Details from './components/Details/Details';
import List from './components/List/List';

const router = createBrowserRouter([
  {
    path: '/',
    element: <List />,
  },
  {
    path: '/:name',
    element: <Details />,
  },
]);

export default router;
