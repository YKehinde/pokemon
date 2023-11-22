import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import List from './components/List/List';
import Details from './components/Details/Detials';

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
