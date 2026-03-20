import React from 'react';
import logo from '../assets/logo.png';

function Footer() {
    return (
        <footer className="modern-footer">
            <div className="modern-container">
                <div className="modern-footer-grid">
                    
                   
                    <div className="modern-footer-col">
                        <a href="/" className="modern-nav-logo" style={{ marginBottom: '16px', display: 'flex' }}>
                            <img src={logo} alt="CursosPlus Logo" className="modern-nav-icon-img" />
                            CursosPlus
                        </a>
                        <p>Plataforma de aprendizaje y oportunidades para emprendedores</p>
                    </div>

                   
                    <div className="modern-footer-col">
                        <h4>Explora</h4>
                        <ul className="modern-footer-links">
                            <li><a href="/cursos">Todos los Cursos</a></li>
                            <li><a href="/categorias">Categorías</a></li>
                            <li><a href="/precios">Precios</a></li>
                            <li><a href="/becas">Becas</a></li>
                        </ul>
                    </div>

                  
                    <div className="modern-footer-col">
                        <h4>Empresa</h4>
                        <ul className="modern-footer-links">
                            <li><a href="/nosotros">Sobre Nosotros</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="/partners">Partners</a></li>
                            <li><a href="/contacto">Contacto</a></li>
                        </ul>
                    </div>

                </div>
                
                <div className="modern-footer-bottom">
                    <div>© 2024 CursosPlus. Todos los derechos reservados.</div>
                    <div className="modern-footer-bottom-links">
                        <a href="/privacidad" style={{color: 'inherit', textDecoration: 'none'}}>Privacidad</a>
                        <a href="/terminos" style={{color: 'inherit', textDecoration: 'none'}}>Términos</a>
                        <a href="/cookies" style={{color: 'inherit', textDecoration: 'none'}}>Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;