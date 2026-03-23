import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


// Importamos todas tus vistas
import LoginPage from '../pages/Login';
import Registro from '../pages/Registro'; 
import ClientProfile from '../pages/ClientProfile';
import ListaDeCursos from '../pages/ListaDeCursos'
import AdminProfile from '../pages/AdminProfile'


 
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* Rutas Privadas (Perfiles) */}
        <Route path="/cliente" element={<ClientProfile />} />
        <Route path="/admin" element={<AdminProfile />} />
        
        {/* Ruta por defecto: si entran a la raíz, los mandamos al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/*Ruta de Curso*/}
        <Route path='/Cursos' element={<ListaDeCursos/>}/>


      </Routes>
    </BrowserRouter>
  );
};

export default Routing;