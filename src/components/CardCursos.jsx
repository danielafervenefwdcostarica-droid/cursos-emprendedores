import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CardCurso({ img, nombreCurso, descripcionCurso, duracionCurso, horarioCurso, precioCurso, tag, tagClass, meta }) {
    const navigate = useNavigate();
    // Estado para controlar si se muestra la descripción completa o truncada
    const [expandido, setExpandido] = useState(false);

    // Determine tag class based on tag content if not provided
    const getTagClass = () => {
        if (tagClass) return tagClass;
        if (!tag) return "";
        const t = tag.toLowerCase();
        if (t === 'popular') return 'tag-popular';
        if (t === 'nuevo') return 'tag-nuevo';
        if (t === 'intermedio') return 'tag-intermedio';
        return 'tag-default';
    };

    return (
        
        <div className="curso-card-horizontal">
            <div className="curso-image-wrapper">
                <img src={img} alt={nombreCurso} className="curso-img" />
            </div>

            <div className="curso-content">
                <div className="curso-meta-top">
                    {tag && <span className={`curso-tag ${getTagClass()}`}>{tag}</span>}
                    {meta && <span className="curso-rating">{meta}</span>}
                </div>
                
                <h3 className="curso-title">{nombreCurso}</h3>
                
                {/* Lógica de descripción: si es muy larga, se muestra un botón para expandir/contraer */}
                <p className={`curso-description ${expandido ? 'expandido' : ''}`}>
                    {descripcionCurso || "Aprende las mejores estrategias y herramientas con este increíble curso."}
                </p>
                
                {descripcionCurso && descripcionCurso.length > 100 && (
                    <button 
                        className="btn-leer-mas" 
                        onClick={() => setExpandido(!expandido)}
                    >
                        {expandido ? "Leer menos" : "Leer más"}
                    </button>
                )}
                
                <div className="curso-footer">
                    <div className="curso-info">
                        {duracionCurso && (
                            <span className="curso-info-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                {duracionCurso}
                            </span>
                        )}
                        {horarioCurso && (
                            <span className="curso-info-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                                {horarioCurso}
                            </span>
                        )}
                        {/* Se ha quitado el icono de dólar ($) a petición del usuario para dejar solo el valor numérico */}
                        {precioCurso && (
                            <span className="curso-info-item">
                                {precioCurso}
                            </span> 
                        )}
                    </div>
                    <button 
                        className="curso-btn-inscribirse"
                        onClick={() => {
                            const isLogged = localStorage.getItem('usuarioLogueado');
                            if (!isLogged) {
                                alert("Aún no estás registrado, regístrate para continuar");
                                navigate('/Registro');
                            } else {
                                navigate('/pago', { state: { cursoSeleccionado: nombreCurso } });
                            }
                        }}
                    >
                        Inscribirse
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardCurso;