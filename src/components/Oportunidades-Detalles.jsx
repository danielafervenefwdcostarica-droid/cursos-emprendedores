import React from 'react';
import '../styles/Opotunidades-Detalles.css';
import concursoImg from '../assets/img/concurso_emprendimientos.png';
import mujeresImg from '../assets/img/Mentoring para Mujeres STEM.jpg';
import becasImg from '../assets/img/BECASoPORTUNIDADES.jpg';

const OportunidadesDetallesComp = () => {
    const oportunidades = [
        {
            id: 1,
            titulo: "Concurso Impulsa Tech 2024",
            categoria: "FONDO SEMILLA",
            descripcion: "Financiamiento de hasta $25,000 para proyectos tecnológicos con impacto social. Buscamos emprendedores que quieran revolucionar el mercado con soluciones innovadoras y escalables.",
            imagen: concursoImg,
            botonText: "Ver más",
            colorClass: "tag-green"
        },
        {
            id: 2,
            titulo: "Mentoring para Mujeres STEM",
            categoria: "INCUBADORA",
            descripcion: "Programa de acompañamiento personalizado por expertos en el sector tecnológico. Enfocado en cerrar la brecha de género y potenciar el talento femenino en ciencia y tecnología.",
            imagen: mujeresImg,
            botonText: "Ver más",
            colorClass: "tag-blue"
        },
        {
            id: 3,
            titulo: "Oportunidades de Becas",
            categoria: "INVERSIÓN ANGEL",
            descripcion: "Accede a una red exclusiva de becas y financiamiento para formación técnica de alto nivel. Potenciamos tu perfil profesional con los mejores recursos educativos del mercado.",
            imagen: becasImg,
            botonText: "Ver becas",
            colorClass: "tag-purple"
        }
    ];

    return (
        <section className="opp-details-container">
            <h1 className="opp-details-title">Nuestras Oportunidades en Detalle</h1>

            <div className="opp-grid">
                {oportunidades.map(op => (
                    <div key={op.id} className="opp-item-section">
                        <div className="opp-item-image">
                            <img src={op.imagen} alt={op.titulo} />
                        </div>
                        <div className="opp-item-content">
                            <span className={`opp-item-tag ${op.colorClass}`}>{op.categoria}</span>
                            <h2 className="opp-item-h2">{op.titulo}</h2>
                            <p className="opp-item-p">{op.descripcion}</p>
                            <button className="modern-btn-primary">{op.botonText}</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OportunidadesDetallesComp;
