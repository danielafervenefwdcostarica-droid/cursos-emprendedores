import React from 'react';
import '../styles/Opotunidades-Detalles.css';
import imgDigital from '../assets/img/e talento digital.jpg';
import imgMujer from '../assets/img/mujeresEmprendedoras.jpg';
import imgAdulto from '../assets/img/AdultosMayores.jpg';
import imgIncubadora from '../assets/img/Mentoring para Mujeres STEM.jpg';
import imgWorld from '../assets/img/angel img1.png';
import imgLaptop from '../assets/img/angel img2.png';

const OportunidadesDetallesComp = () => {
    const financiamientos = [
        {
            id: 1,
            tipo: "Fondo Semilla",
            descripcion: "Capital inicial para prototipar tu idea académica. Ideal para proyectos en fase de concepción que requieren un primer empuje financiero directo desde nuestra plataforma.",
            imageType: 'none',
            icon: 'leaf',
        },
        {
            id: 2,
            tipo: "Incubadoras de Talento",
            descripcion: "Un entorno de aceleración donde mentores y recursos técnicos convergen. No solo financiamos, sino que estructuramos tu crecimiento profesional paso a paso.",
            imageType: 'card-dark',
            bgImage: imgIncubadora,
            icon: 'rocket',
            tags: ["Acompañamiento 1:1", "Recursos Técnicos"],
            isDark: true,
        },
        {
            id: 3,
            tipo: "Inversión Ángel",
            categoria: "INVERSIÓN ÁNGEL",
            descripcion: "Conexión directa con inversores privados interesados en becar talentos específicos a cambio de participación en futuros desarrollos o networking exclusivo.",
            imageType: 'two-images',
            dualImages: [imgWorld, imgLaptop],
            icon: 'cloud',
        },
    ];

    const becas = [
        {
            id: 1,
            tag: "100% GRATUITO",
            tagClass: "tag-blue-light",
            titulo: "Beca Talento Digital",
            descripcion: "Especialización completa en Inteligencia Artificial y Marketing Digital. Orientado a jóvenes que buscan liderar la nueva economía tecnológica.",
            image: imgDigital,
            botonText: "PROXIMAMENTE"
        },
        {
            id: 2,
            tag: "APOYO 50%",
            tagClass: "tag-purple-light",
            titulo: "Beca Emprende Mujer",
            descripcion: "Financiamiento y mentoría estratégica diseñada para madres emprendedoras y mujeres que buscan transformar sus ideas en negocios reales, facilitando el acceso a recursos clave para el éxito empresarial y personal.",
            image: imgMujer,
            botonText: "PROXIMAMENTE"
        },
        {
            id: 3,
            tag: "INCLUSIÓN",
            tagClass: "tag-cyan-light",
            titulo: "Beca Adulto Conectado",
            descripcion: "Reducción de la brecha digital para mayores de 50 años. Aprende a dominar herramientas modernas y mantente relevante en el mercado.",
            image: imgAdulto,
            botonText: "PROXIMAMENTE"
        }
    ];

    const renderIcon = (fin) => {
        let iconContent = null;
        if (fin.icon === 'leaf') iconContent = "🍃"; 
        if (fin.icon === 'rocket') iconContent = "🚀";
        if (fin.icon === 'cloud') iconContent = "☁️";

        return (
            <div className={`icon-container ${fin.icon}-icon`}>
                <span className="white-icon">{iconContent}</span>
            </div>
        );
    };

    return (
        <main className="main-content-wrapper">
            <section className="hero-section">
                <span className="opp-tag">OPORTUNIDADES</span>
                <h1 className="main-title">Impulsa tu Futuro<br />Académico.</h1>
                <p className="main-subtitle">
                    En CursosPlus, eliminamos las barreras económicas. Descubre mecanismos de inversión y programas de becas diseñados para potenciar tu talento.
                </p>
            </section>

            <section className="financiamiento-section">
                <div className="section-title-wrapper">
                    <h2 className="section-title">Tipos de Financiamiento</h2>
                    <div className="title-line"></div>
                </div>
                <div className="fin-grid">
                    {financiamientos.map(fin => (
                        <div key={fin.id} className={`fin-item ${fin.isDark ? 'dark-card' : ''} ${fin.imageType}`}>
                            <div className="fin-content">
                                {renderIcon(fin)}
                                <h3 className="fin-item-title">{fin.tipo}</h3>
                                <p className="fin-item-p">{fin.descripcion}</p>
                                {fin.tags && (
                                    <div className="fin-tags-container">
                                        {fin.tags.map(tag => <span key={tag} className="fin-tag">{tag}</span>)}
                                    </div>
                                )}
                            </div>

                            {fin.imageType === 'card-dark' && (
                                <div className="fin-image-dark">
                                    <img src={fin.bgImage} alt="Background" className="fin-bg-img" />
                                    <div className="overlay-dark"></div>
                                </div>
                            )}

                            {fin.imageType === 'two-images' && (
                                <div className="fin-images-dual">
                                    {fin.dualImages && fin.dualImages.map((img, idx) => (
                                        <div key={idx} className={`img-wrapper ${idx === 0 ? 'world-img' : 'laptop-img'}`}>
                                            <img src={img} alt="Detail" className="fin-dual-img" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="becas-section">
                <div className="becas-header">
                    <div className="becas-header-text">
                        <h2 className="section-title">Becas CursosPlus</h2>
                        <p className="becas-subtitle">Seleccionamos los perfiles con mayor potencial para transformar industrias. Aplica hoy a una de nuestras convocatorias vigentes.</p>
                    </div>
                </div>

                <div className="becas-grid">
                    {becas.map(beca => (
                        <div key={beca.id} className="beca-card">
                            <div className="beca-card-image">
                                <span className={`beca-tag ${beca.tagClass}`}>{beca.tag}</span>
                                {beca.image ? (
                                    <img src={beca.image} alt={beca.titulo} className="beca-img" />
                                ) : (
                                    <div className={`placeholder-beca-img ${beca.titulo.toLowerCase().replace(/ /g, '-')}`}>
                                        {beca.titulo === "Beca Talento Digital" && <div className="digital-placeholder">IA</div>}
                                        {beca.titulo === "Beca Emprende Mujer" && <div className="mujer-placeholder">👩‍💼</div>}
                                        {beca.titulo === "Beca Adulto Conectado" && <div className="adulto-placeholder">👴</div>}
                                    </div>
                                )}
                            </div>
                            <div className="beca-card-content">
                                <h3 className="beca-title">{beca.titulo}</h3>
                                <p className="beca-p">{beca.descripcion}</p>
                                <div className="proximamente-tag">{beca.botonText}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default OportunidadesDetallesComp;