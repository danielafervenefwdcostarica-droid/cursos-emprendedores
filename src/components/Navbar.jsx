import React from 'react'
function Navbar() {

  return (
    <nav className="navbar">
      <h2>CursosPlus</h2>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/cursos">Cursos</a></li>
        <li><a href="/contacto">Contacto</a></li>
      </ul>
      <link to="/login">
      <button>Login</button>
      </link>
    </nav>

  );
}

export default Navbar