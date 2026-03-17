import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importamos todas tus vistas
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../components/RegisterPage'; 
import ClientProfile from '../pages/ClientProfile';
import AdminProfile from '../pages/AdminProfile';
import CursosIdi from '../pages/CursosIdi'
import CursosTec from '../pages/CursosTec';
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        
        {/* Rutas Privadas (Perfiles) */}
        <Route path="/cliente" element={<ClientProfile />} />
        <Route path="/admin" element={<AdminProfile />} />
        
        {/* Ruta por defecto: si entran a la raíz, los mandamos al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route  path="/Cursosi" element={<CursosIdi/>}/>
        <Route path="/CursosT" element={<CursosTec/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;