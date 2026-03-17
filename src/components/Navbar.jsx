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
      </ul>
      <Link to="/login">
      <button>Login</button>
      </Link>
    </nav>

  );
}

export default Navbar