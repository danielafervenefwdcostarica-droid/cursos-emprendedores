import React, { useEffect, useState } from 'react';
import { getCursos } from '../services/fetch';

function Opportunities() {
    const [cursos,setCursos] = useState([])

    useEffect(()=>{
        async function traerCursos() {
            const peticion = await getCursos()
            setCursos(peticion)
        }
        traerCursos()
    },[])

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
                {cursos.map((item, index) => (
                    <div key={index} className="modern-opp-card">
                        <img src={item.imagen} alt={item.titulo} className="modern-opp-img" />
                        <div className="modern-opp-content">
                            <div className="modern-opp-meta">
                                <span className={item.tagClass}>{item.tag}</span>
                                <span>{item.meta}</span>
                            </div>
                            <h3>{item.nombre}</h3>
                            <p>{item.descripcion}</p>
                            <button className="modern-opp-btn">{item.duracion}</button>
                            <button className="modern-opp-btn">{item.horario}</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Opportunities;
   