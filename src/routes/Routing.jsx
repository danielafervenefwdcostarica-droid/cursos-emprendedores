import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importamos todas tus vistas
import LoginPage from '../components/LoginPage';
import Registro from '../components/Registro'; 
import ClientProfile from '../components/ClientProfile';
import AdminProfile from '../components/AdminProfile';
import Inicio from '../components/Home';


const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/oportunidades" element={<OpportunitiesHome />} />
        <Route path="/inicio" element={<Inicio />} />


        {/* Rutas Privadas (Perfiles) */}
        <Route path="/cliente" element={<ClientProfile />} />
        <Route path="/admin" element={<AdminProfile />} />
        
        {/* Ruta por defecto: si entran a la raíz, los mandamos al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

  

      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
