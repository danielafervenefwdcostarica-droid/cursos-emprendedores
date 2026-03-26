import React from 'react';
import concursoImg from '../assets/img/concurso_emprendimientos.png';
import mujeresImg from '../assets/img/Mentoring para Mujeres STEM.jpg';
import becasImg from '../assets/img/BECASoPORTUNIDADES.jpg';

function Opportunities() {
    const staticCursos = [
        {
            nombre: "Concurso Impulsa Tech 2024",
            descripcion: "Financiamiento de hasta $25,000 para proyectos tecnológicos con impacto social.",
            imagen: concursoImg,
            tag: "FONDO SEMILLA",
            tagClass: "modern-tag-green",
            botonText: "Ver más"
        },
        {
            nombre: "Mentoring para Mujeres STEM",
            descripcion: "Programa de acompañamiento personalizado por expertos en el sector tecnológico.",
            imagen: mujeresImg,
            tag: "INCUBADORA",
            tagClass: "modern-tag-blue",
            botonText: "Ver más"
        },
        {
            nombre: "Oportunidades de Becas",
            descripcion: "Presenta tu perfil ante una red de becas y formación técnica de alto nivel.",
            imagen: becasImg,
            tag: "INVERSIÓN ANGEL",
            tagClass: "modern-tag-purple",
            botonText: "Ver becas"
        }
    ];

    return (
        <section className="modern-opportunities" id="oportunidades-destacadas">
            <div className="section-header">
                <div>
                    <h2>Oportunidades Destacadas</h2>
                    <p>Fondos concursables, incubadoras y concursos de emprendimiento.</p>
                </div>
            </div>
            
            <div className="modern-opp-grid">
                {staticCursos.map((item, index) => (
                    <div key={index} className="modern-opp-card">
                        <img src={item.imagen} alt={item.nombre} className="modern-opp-img" />
                        <div className="modern-opp-content">
                            <div className="modern-opp-meta">
                                <span className={item.tagClass}>{item.tag}</span>
                            </div>
                            <h3>{item.nombre}</h3>
                            <p>{item.descripcion}</p>
                            <a href="/oportunidades-detalles" className="modern-opp-btn">
                                {item.botonText}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Opportunities;