//npm run dev

import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import React from 'react';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import Auth from './pages/Auth';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
  return (
    <>
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            fontSize: '1.8rem',
          }
        }}
      ></Toaster>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          {/* Route ou il est nécessaire d'etre authentifié pour y avoir acces */}
          <Route path="/" element={<Home />} ></Route>
          <Route path="/edite-profile" element={<EditProfile />} ></Route>
        </Route>
        <Route path="/auth" element={<Auth />} ></Route>
      </Routes>
    </>
  );
}

export default App;

