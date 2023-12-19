import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import ListPage from './pages/ListPage/ListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ListPage />,
  },
  {
    path: '/:name',
    element: <DetailsPage />,
  },
]);

export default router;
