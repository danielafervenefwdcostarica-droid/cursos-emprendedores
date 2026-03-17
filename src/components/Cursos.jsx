import React from 'react'
import CardCurso from './CardCursoIn'
import "../styles/Cursos.css"
function Cursos() {

  return (
    <div className='cont-cursos'>
        <CardCurso nombreCurso={"Alemán(Inicial"}  descripcionCurso={"Curso básico para aprender vocabulario, pronunciación,gramática inicial con artículos(der, die, das)"}duraciónCurso={"31/03/2026 a 30/06/2026"} horarioCurso={"las lecciones se llevarán a cabo de Lunes a Viernes desde las 8:30 am hasta las 11:30 am "}/>
         <CardCurso nombreCurso={"Mandarín(Intermedio)"}  descripcionCurso={"Curso con vocabulario avanzado donde se verá gramatica intermedia, tonos, pinyin, caráteres."}duraciónCurso={"11/05/2026 a 31/08/2026"} horarioCurso={"las lecciones se llevarán a cabo de Lunes a Viernes desde las 8:30 am hasta las 11:30 am "}/>
        <CardCurso nombreCurso={"Inglés(Inicial)"}  descripcionCurso={"Aprende inglés desde cero, con vocabulario básico, gramática inicial, pronunciación y frases cotidianas."}duraciónCurso={"13/04/2026 a 27/07/2026"} horarioCurso={"las lecciones se llevarán a cabo de Lunes a Viernes desde las 8:30 am hasta las 11:30 am "}/>
    </div>  
  )
}

export default Cursos
