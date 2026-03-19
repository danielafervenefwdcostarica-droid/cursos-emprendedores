import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ListaDeCursos from '../pages/ListaDeCursos';
import Contacto from '../pages/Contacto';
import LoginPage from '../pages/LoginPage';
import AdminComponents from '../components/Admin.components';
import Categories from '../pages/Categories';

function Routing() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
  )
}



export default Routing;
