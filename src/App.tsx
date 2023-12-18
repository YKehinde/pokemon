import { RouterProvider, createRoutesFromElements } from 'react-router-dom';
import router from './routes';
import './App.scss';
import React from 'react';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
