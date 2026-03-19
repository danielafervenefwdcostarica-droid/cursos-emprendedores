import React from 'react';
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
