import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

<<<<<<< HEAD
// Importamos todas tus vistas
import LoginPage from '../pages/LoginPage';
import Registro from '../pages/Registro'; 
import ClientProfile from '../pages/ClientProfile';
import AdminProfile from '../pages/AdminProfile';
import CursosIdi from '../pages/CursosIdi';
import CursosTec from '../pages/CursosTec';
import CursosArte from '../pages/CursosArte';
import CursosBe from '../pages/CursosBe';
=======
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage'; 
import ClientProfile from '../pages/ClientProfile';
import AdminProfile from '../pages/AdminProfile';

>>>>>>> 904a23ff299a345a013f93862f2ca81b228f3f70
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        {/* Rutas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<Registro />} />
        
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

=======
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        
        <Route path="/cliente" element={<ClientProfile />} />
        <Route path="/admin" element={<AdminProfile />} />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
>>>>>>> 904a23ff299a345a013f93862f2ca81b228f3f70
      </Routes>
    </BrowserRouter>
  );
};

<<<<<<< HEAD
export default Routing;
=======
export default Routing;
>>>>>>> 904a23ff299a345a013f93862f2ca81b228f3f70
