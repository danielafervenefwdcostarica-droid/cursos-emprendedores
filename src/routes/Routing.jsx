import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importamos todas tus vistas
import LoginPage from '../pages/LoginPage';
import Registro from '../pages/Registro'; 
import ClientProfile from '../pages/ClientProfile';
import AdminProfile from '../pages/AdminProfile';
import CursosIdi from '../pages/CursosIdi';
import CursosTec from '../pages/CursosTec';
import CursosArte from '../pages/CursosArte';
import CursosBe from '../pages/CursosBe';
import Inicio from '../pages/Home';
import OpportunitiesHome from '../pages/OpportunitiesHome';

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

        {/*Rutas de Cursos*/}
        <Route  path="/CursosIdiomas" element={<CursosIdi/>}/>
        <Route path="/CursosTecnología" element={<CursosTec/>}/>
        <Route patch="/CursosArtesania" element={<CursosArte/>}/>
        <Route path="/Cursos Belleza y estética" element={<CursosBe/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
