import React, { useState, useEffect } from "react";
import "../styles/SobreNosotros.css";

import visionImg from '../assets/img/sobrenosotros4tec.png';
import catImg5 from '../assets/img/SOBRENOSOTROS5.jpg';
import catImg6 from '../assets/img/SOBRENOSOTROS6.jpg';
import quienesImg1 from '../assets/img/sobrenosotrosss.png';
import quienesImg2 from '../assets/img/sobrenojotros2.png';
import logoImg from '../assets/logo.png';
import heroImg7 from '../assets/img/SOBRENOSTROS7.png';
import heroImg9 from '../assets/img/SOBRENOSOTROS9.jpg';
import heroImg3 from '../assets/img/sobrenosotro3art.png';

const SobreNosotrosComp = () => {
   
    const [indiceCatalogo, setIndiceCatalogo] = useState(0);
    const [indiceQuienes, setIndiceQuienes] = useState(0);
    const [indiceHero, setIndiceHero] = useState(0);

   
    const imagenesCatalogo = [catImg5, catImg6];
    const imagenesQuienes = [quienesImg1, quienesImg2];
    const imagenesHero = [logoImg, heroImg7, heroImg9, heroImg3];

    
    useEffect(() => {
        const timer = setInterval(() => {
            setIndiceCatalogo(prev => (prev === 0 ? 1 : 0));
            setIndiceQuienes(prev => (prev === 0 ? 1 : 0));
            setIndiceHero(prev => (prev + 1) % imagenesHero.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [imagenesHero.length]);

    return (
        <div className="about-page">
            <section className="hero">
                <div className="hero-text">
                    <span className="tag">Nuestros desafios</span>
                    <h1>Emprender no deberia ser un laberinto</h1>
                    <p>Muchas personas desean aprender nuevas habilidades o emprender, pero no encuentran
                        cursos accesibles ni oportunidades claras.</p>
                        
                       <p> Vivimos en una era saturada de informacion, pero paradojicamenete, encontrar recursos practicos, fondod reales y cursos accesibles
                         es mas dificil que nunca.El entorno digital actual es confuso,fragmentado y excluyente.
                    </p>
                    
                    <div className="alert-box">
                        <span className="alert-icon">🚀</span>
                        <p>Miles de oportunidades se pierden por falta de informacion centralizada y no especifica.</p>
                    </div>
                </div>
                
                <div className="hero-image">
                    <div className="hero-carousel-container">
                        <img src={imagenesHero[indiceHero]} alt="Carrusel becas" className="fade-img hero-carousel-img" />
                    </div>
                </div>
            </section>

          
            <section className="quienes">
    
                <div className="quienes-bg-container">
                    <img src={imagenesQuienes[indiceQuienes]} alt="Quienes somos fondo" className="bg-img-absolute fade-img" />
                    <div className="bg-overlay-white-soft"></div>
                </div>

                <div className="content-relative quienes-flex-container">
                    <div className="quienes-content">
                        <span className="tag">Quienes somos</span>
                        <h2>El costo de la inacción</h2>
                        <p className="quienes-subtitle">Somos un equipo que busca facilitar el acceso a la educacion y oportunidades para emprendedores.</p>
                        
                        <ul className="quienes-list">
                            <li>
                                <span className="list-icon">🔴</span>
                                <div>
                                    <strong>Integridad Académica</strong>
                                    <p>Sin barreras ni falta de liquidez básica.</p>
                                </div>
                            </li>
                            <li>
                                <span className="list-icon">🔴</span>
                                <div>
                                    <strong>Enfoque humano</strong>
                                    <p>Formación continua y oportunidades fuera del mercado.</p>
                                </div>
                            </li>
                            <li>
                                <span className="list-icon">🔴</span>
                                <div>
                                    <strong>Innovación Constante</strong>
                                    <p>Simplificar la tecnología para toda una generación.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="quienes-quote-card">
                        <h3>"El costo de la ignorancia digital es la irrelevancia económica."</h3>
                        <p>Por eso, nuestra urgencia es la oportunidad. No solo informamos, protegemos el futuro de tu negocio con impacto real.</p>
                    </div>
                </div>
            </section>

            <section className="mision">
                <span className="tag">Nuestra Mision</span>
                <h2>Los cimientos de nuestra vanguardia</h2>
                <p className="mision-desc">Centralizar educacion practica y oportunidades para emprendedores en una sola plataforma accesible.</p>
                
                <div className="mision-cards">
                    <div className="mision-card">
                        <div className="mision-icon">🎯</div>
                        <h3>Centralizacion</h3>
                        <p>Diseño para todo tipo de usuarios. Eliminamos la jerga técnica innecesaria para que navegues con confianza.</p>
                    </div>
                    
                    <div className="mision-card">
                        <div className="mision-icon">💡</div>
                        <h3>Accesibilidad</h3>
                        <p>Diseño para todo tipo de usuarios. Nos anticipamos y utilizamos datos en tiempo real.</p>
                    </div>
                    
                    <div className="mision-card">
                        <div className="mision-icon">🚀</div>
                        <h3>Impacto Real</h3>
                        <p>Conectamos aprendizaje con oportunidades reales. Te damos conocimientos para que no dependas de intermediarios.</p>
                    </div>
                </div>
            </section>

            <section className="objetivos">
                <div className="objetivos-header">
                    <h2>Nuestros Objetivos</h2>
                    <p>Desarrollar una plataforma web que permita acceder a cursos y oportunidades de emprendimiento de forma simple.</p>
                </div>
                
                <div className="objetivos-grid">
                    <div className="objetivo-principal">
                        <img src={visionImg} alt="Visión 2030" className="bg-img-absolute" />
                        <div className="bg-overlay-blue"></div>
                        <div className="content-relative">
                            <h3>Objetivo General 2030</h3>
                            <p>Centralizar el 100% de la oferta académica práctica y las oportunidades de financiamiento en una plataforma unificada, eliminando definitivamente la brecha de acceso para los emprendedores.</p>
                        </div>
                    </div>

                    <div className="objetivos-side">
                        <div className="objetivo-card full-width">
                            <img src={imagenesCatalogo[indiceCatalogo]} alt="Carrusel de catálogo" className="bg-img-absolute fade-img opacity-adjust" />
                            <div className="bg-overlay-white"></div>
                            <div className="content-relative content-flex-row">
                                <div className="small-icon" style={{ zIndex: 2 }}>👥</div>
                                <div>
                                    <h4>Catálogo de cursos</h4>
                                    <p>Organizados por categorías. Educadores y emprendedores que prefieren la claridad a la complejidad.</p>
                                </div>
                            </div>
                        </div>
                        <div className="objetivo-card">
                            <h4>Búsqueda inteligente</h4>
                            <p>Filtros para encontrar contenido facilmente y rápido.</p>
                        </div>
                        <div className="objetivo-card">
                            <div className="small-icon-blue">🔄</div>
                            <h4>Oportunidades</h4>
                            <p>Dashboard con fondos y convocatorias al instante.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="cta-section">
                <h2>¿Listo para formar parte de la historia?</h2>
                <p>Unete a nuestra plataforma y comienza a aprender hoy mismo redefiniendo tu aprendizaje.</p>

                <div className="cta-buttons">
                    <a href="/lista" className="btn-primary">Explorar Cursos</a>
                    <a href="/#oportunidades-destacadas" className="btn-secondary">Ver Oportunidades</a>
                </div>
            </section>

        </div>
   );
};

export default SobreNosotrosComp;
