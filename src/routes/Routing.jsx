import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage'; 
import ClientProfile from '../pages/ClientProfile';
import AdminProfile from '../pages/AdminProfile';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        
        <Route path="/cliente" element={<ClientProfile />} />
        <Route path="/admin" element={<AdminProfile />} />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;