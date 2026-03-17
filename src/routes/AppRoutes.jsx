import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Opportunities from '../pages/OpportunitiesHome';


import PrivateRoute from './PrivateRoute';

function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={ <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
          <Route path='/cursos' element={<Cursos />} />
          <Route
          path="/oportunidades"
          element={
            <PrivateRoute>
              <Opportunities />
            </PrivateRoute>
          }
        />
          <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes