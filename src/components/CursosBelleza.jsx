import React from 'react'
import CardCurso from './CardCursos'
import '../styles/Cursos.css'
function CursosBelleza() {
  return (
    <div>
       <CardCurso nombreCurso={"Manicurista"}  descripcionCurso={"En este curso el estudiante apnrenderá a manipular productos para la preparación de maniquiur al igual que realizar Esmaltado y muchísimos más"}duraciónCurso={"06/04/2026 a 07/08/2026"} horarioCurso={"10:00 am a 1:00 pm"}/>
    </div>
  )
}

export default CursosBelleza
