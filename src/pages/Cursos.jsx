import { useEffect, useState } from "react"
import { getCursos } from "../services/fetch"
import CardCurso from "../components/CardCursos"

function Cursos() {
  const [cursos,setCursos] = useState([])

  useEffect(()=>{
    async function traerCursos() {
       const peticion = await getCursos()
       setCursos(peticion)
    }
    traerCursos()
  },[])
  return (
    <div>
        <div className="modern-opp-container">
            {cursos.map((item, index) => (
                <CardCurso
                    key={index}
                    img={item.imagen}
                    nombreCurso={item.nombreCurso}
                    descripcionCurso={item.descripcionCurso}
                    duracionCurso={item.duracionCurso}
                    horarioCurso={item.horarioCurso}
                    tag={item.tag}
                />
            ))}
        </div>
    </div>
  )
}

export default Cursos
