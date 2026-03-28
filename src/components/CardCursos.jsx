import React from 'react';

function CardCurso({ nombreCurso, descripcionCurso, duraciónCurso, horarioCurso }) {
    return (
        <>
            <div className="card">
                <div className="card-image"></div>
                <div className="category"> {nombreCurso} </div>
                <div className="heading"> {descripcionCurso}
                    <div className="author"> <span className="name">{duraciónCurso} </span> {horarioCurso}</div>
                </div>
            </div>
        </>
    );
}

export default CardCurso;