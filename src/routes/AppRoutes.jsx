import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Opportunities from '../pages/OpportunitiesHome';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../components/RegisterPage';
import ClientProfile from '../pages/ClientProfile';
import AdminProfile from '../pages/AdminProfile';
import CursosG from '../pages/CursosG';
import PrivateRoute from './PrivateRoute';
import { Navigate } from 'react-router-dom';

function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element= {<Home/> } />
          <Route path='/cursos' element={<CursosG />} />
          <Route
          path="/oportunidades"
          element={
            <PrivateRoute>
              <Opportunities />
            </PrivateRoute>
          }
        />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/cliente" element={<ClientProfile />} />
      <Route path="/admin" element={<AdminProfile />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes