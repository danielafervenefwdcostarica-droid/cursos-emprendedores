import React from 'react'
import { Link } from 'react-router-dom';
function Navbar() {

  return (
    <nav className="navbar">
      <h2>CursosPlus</h2>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/cursos">Cursos</a></li>
        <li><a href="/contacto">Contacto</a></li>
        <li><a href="/login">Login</a></li>
      </ul>

    </nav>

  );
}

export default Navbar