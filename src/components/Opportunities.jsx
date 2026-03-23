import React from 'react';

function Opportunities() {
    const opportunities = [
        {
            titulo: "Concurso Nacional de Innovacion",
            descripcion: "Obtener financiamiento para tu proyecto.",
            tag: "CONCURSO",
            tagClass: "modern-tag-blue",
            meta: "Abierto",
            img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            buttonText: "Ver Más"
        },
        {
            titulo: "Impulso digital",
            descripcion: "Programa de apoyo para emprendedores digitales.",
            tag: "PROGRAMA",
            tagClass: "modern-tag-green",
            meta: "Plazo abierto",
            img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            buttonText: "Ver Más"
        },
        {
            titulo: "Beca de emprendimiento social",
            descripcion: "Formacion gratuita en negocios.",
            tag: "BECAS",
            tagClass: "modern-tag-purple",
            meta: "Todo el año",
            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            buttonText: "Ver Más"
        }
    ];

    return (
        <section className="modern-opportunities">
            <div className="section-header">
                <div>
                    <h2>Oportunidades Destacadas</h2>
                    <p>Fondos concursables, incubadoras y concursos de emprendimiento.</p>
                </div>
                <a href="/oportunidades">Ver todas <span>→</span></a>
            </div>
            
            <div className="modern-opp-grid">
                {opportunities.map((item, index) => (
                    <div key={index} className="modern-opp-card">
                        <img src={item.img} alt={item.titulo} className="modern-opp-img" />
                        <div className="modern-opp-content">
                            <div className="modern-opp-meta">
                                <span className={item.tagClass}>{item.tag}</span>
                                <span>{item.meta}</span>
                            </div>
                            <h3>{item.titulo}</h3>
                            <p>{item.descripcion}</p>
                            <button className="modern-opp-btn">{item.buttonText}</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Opportunities;
   