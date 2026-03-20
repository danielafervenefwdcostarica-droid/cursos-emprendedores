import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <nav className="modern-navbar">
      <div className="modern-navbar-content">
        
        
        <a href="/" className="modern-nav-logo">
          <img src={logo} alt="CursosPlus Logo" className="modern-nav-icon-img" />
          CursosPlus
        </a>

       
        <ul className="modern-nav-links">
          <li><a href="/">Inicio</a></li>
          <li><a href="/cursos">Cursos</a></li>
          <li><a href="/sobre-nosotros">Sobre Nosotros</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>

       
        <div>
          <a href="/login" className="modern-btn-primary">Login</a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;