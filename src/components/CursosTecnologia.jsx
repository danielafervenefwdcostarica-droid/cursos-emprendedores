import React from 'react'
import CardCurso from './CardCursos'
import '../styles/Cursos.css'
function CursosTecnologia() {
  return (
    <div>
      <h1>TECNOLOGÍA</h1>
      <br />
      <CardCurso nombreCurso={"Ciberseguridad"}  descripcionCurso={"Los estudiantes aprenderán a proteger sistemas y datos de ataques digitales"}duraciónCurso={"13/04/2026 a 30/10/2026"} horarioCurso={"se llevará a cabo desde las 8:30 am a 1:30 pm de lunes a viernes "}/>
      </div>
  )
}

export default CursosTecnologia
