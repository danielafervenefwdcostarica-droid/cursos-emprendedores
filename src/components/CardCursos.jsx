function CardCurso({ img,nombreCurso, descripcionCurso, duracionCurso, horarioCurso, tag,tagClass,meta }) {

    return (
        <>
            <div className="modern-opp-card">
                <img src={img} alt={nombreCurso} className="modern-opp-img" />

                <div className="modern-opp-content">
                    <div className="modern-opp-meta">
                        <span className={tagClass}>{tag}</span>
                        <span>{meta}</span>
                    </div>
                    <h3>{nombreCurso}</h3>
                    <p>{descripcionCurso}</p>
                    <button className="modern-opp-btn">{duracionCurso}</button>
                    <button className="modern-opp-btn">{horarioCurso}</button>
                </div>
            </div>
        </>
    )
}

export default CardCurso