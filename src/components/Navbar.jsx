import React from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('usuarioLogueado'));

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('id');
    navigate('/');
  };

  return (
    <nav className="modern-navbar">
      <div className="modern-navbar-content">
        
        <Link to="/" className="modern-nav-logo">
          <img src={logo} alt="CursosPlus Logo" className="modern-nav-icon-img" />
          CursosPlus
        </Link>

        <ul className="modern-nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/cursos">Cursos</Link></li>
          <li><Link to="/Sobre-Nosotros">Sobre Nosotros</Link></li>
          <li><Link to="/Contacto">Contacto</Link></li>
        </ul>

        <div className="modern-nav-actions">
          {user ? (
            <>
              <Link 
                to={user.role === 'admin' ? '/panelAdministrativo' : '/PerfilCliente'} 
                className="modern-nav-profile-link"
                style={{ marginRight: '15px', fontWeight: '600', color: '#2563eb', textDecoration: 'none' }}
              >
                Mi Perfil
              </Link>
              <button onClick={handleLogout} className="modern-btn-primary">Logout</button>
            </>
          ) : (
            <Link to="/login" className="modern-btn-primary">Login</Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;