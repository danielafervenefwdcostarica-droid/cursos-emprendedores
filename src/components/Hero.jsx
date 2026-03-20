import React from 'react';
import HomeCarousel from './HomeCarousel';

function Hero() {
  return (
    <section className="modern-hero">
      <div className="modern-hero-content">
        <h1>Aprende habilidades, impulsa tus proyectos</h1>
        <p>La plataforma que combina cursos prácticos con oportunidades reales de emprendimiento</p>
        <div className="modern-hero-buttons">
          <button className="modern-btn-primary">Explorar Cursos</button>
        </div>
      </div>
      <div className="modern-hero-visual">
        <HomeCarousel />
      </div>
    </section>
  );
}

export default Hero;