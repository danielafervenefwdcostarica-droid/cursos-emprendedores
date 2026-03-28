import React from 'react';
import logo from '../assets/logo.png';

function Footer() {
    return (
        <footer className="modern-footer">
            <div className="modern-container">
                <div className="modern-footer-grid">

                    <div className="modern-footer-col">
                        <a href="/" className="modern-nav-logo footer-logo-link">
                            <img src={logo} alt="CursosPlus Logo" className="modern-nav-icon-img" />
                            CursosPlus
                        </a>
                        <p>Plataforma de aprendizaje y oportunidades para emprendedores</p>
                    </div>

                    <div className="modern-footer-col">
                        <h4>Explora</h4>
                        <ul className="modern-footer-links">
                            <li><a href="/cursos">Nuestros Cursos</a></li>
                            <li><a href="/precios">Precios</a></li>
                            <li><a href="/becas">Becas</a></li>
                        </ul>
                    </div>

                    <div className="modern-footer-col">
                        <h4>Empresa</h4>
                        <ul className="modern-footer-links">
                            <li><a href="/SobreNosotros">Sobre Nosotros</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="/contacto">Contacto</a></li>
                        </ul>
                    </div>

                </div>
                
                <div className="modern-footer-bottom">
                    <div>© 2024 CursosPlus. Todos los derechos reservados.</div>
                    <div className="modern-footer-bottom-links">
                        <a href="/privacidad" className="footer-bottom-link">Privacidad</a>
                        <a href="/terminos" className="footer-bottom-link">Términos</a>
                        <a href="/cookies" className="footer-bottom-link">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;