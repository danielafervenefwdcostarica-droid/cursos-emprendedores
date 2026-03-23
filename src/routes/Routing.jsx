import React from 'react';
<<<<<<< HEAD
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
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contacto from '../pages/Contacto';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdministradorPerfil from '../pages/AdministradorPerfil';
import ListaDeCursos from '../pages/ListaDeCursos';
import ClientePerfil from '../pages/ClientePerfil';

function Routing() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Contacto' element={<Contacto/>}/>
         <Route path='/Registro' element={<RegisterPage/>}/>
         <Route path='/Login' element={<LoginPage/>}/>
         <Route path='/panelAdministrativo'element={<AdministradorPerfil/>}/>
         <Route path='/PerfilCliente' element={<ClientePerfil/>}/>
         <Route path= '/lista' element={<ListaDeCursos/>}/>

      </Routes>
    </Router>
  )
}



export default Routing;
>>>>>>> 3dcc61249f19e39a0aa8bb673a4cb2e2ec46ee92
