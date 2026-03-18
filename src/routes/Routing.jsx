import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ¡AQUÍ ESTÁ EL CAMBIO! Ahora apuntan a la carpeta components
import LoginPage from '../components/LoginPage.jsx';
import RegisterPage from '../components/RegisterPage.jsx'; 

// Estos se quedan igual porque siguen en la carpeta pages
import ClientProfile from '../pages/ClientProfile.jsx';
import AdminProfile from '../pages/AdminProfile.jsx';

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