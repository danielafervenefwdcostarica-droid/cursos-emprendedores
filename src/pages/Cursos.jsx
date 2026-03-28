import { useEffect, useState } from "react"
import { getCursos } from "../services/fetch"
import CardCurso from "../components/CardCursos"
import "../styles/Cursos.css"

function Cursos() {
  // NUEVO ENFOQUE: Se consolidaron más de 6 estados redundantes en solo 2.
  // 1. Guardamos la lista completa de cursos obtenidos del servidor.
  const [todosLosCursos, setTodosLosCursos] = useState([])
  // 2. Rastreamos con un string qué filtro seleccionó el usuario.
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')

  // Se eliminaron 5 useEffects en conflicto por solo UNO que carga todo al montar.
  useEffect(()=>{
    async function traerCursos() {
       const peticion = await getCursos()
       if(peticion) {
           setTodosLosCursos(peticion)
       }
    }
    traerCursos()
  },[])

  // Lógica dinámica: en lugar de guardar 5 arreglos copiados en el estado local,
  // simplemente filtramos la lista original en "tiempo de ejecución" dependiendo
  // del botón presionado, por lo que nunca habrá duplicados o datos desfasados.
  const cursosFiltrados = categoriaActiva === 'Todos' 
    ? todosLosCursos 
    : todosLosCursos.filter((curso) => {
        if (!curso.categoria) return false;
        return curso.categoria.toLowerCase() === categoriaActiva.toLowerCase()
      })

  return (
    <div className="cursos-page-wrapper">
        <h1 className="cursos-page-title">Catálogo de Cursos</h1>
        <p className="cursos-page-subtitle">Impulsa tu vida con nuestra selección de cursos certificados por expertos de la industria.</p>
        
        <div className="cursos-filters">
            <button 
              className={`filter-btn ${categoriaActiva === 'Todos' ? 'active' : ''}`}
              onClick={() => setCategoriaActiva('Todos')}
            >
              Todos
            </button>
            <button 
              className={`filter-btn ${categoriaActiva === 'tecnologia' ? 'active' : ''}`}
              onClick={() => setCategoriaActiva('tecnologia')}
            >
              Tecnologia <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></svg>
            </button>
            <button 
              className={`filter-btn ${categoriaActiva === 'artesania' ? 'active' : ''}`}
              onClick={() => setCategoriaActiva('artesania')}
            >
              Artesania <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></svg>
            </button>
            <button 
              className={`filter-btn ${categoriaActiva === 'musica' ? 'active' : ''}`}
              onClick={() => setCategoriaActiva('musica')}
            >
              Musica <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></svg>
            </button>
            <button 
              className={`filter-btn ${categoriaActiva === 'belleza' ? 'active' : ''}`}
              onClick={() => setCategoriaActiva('belleza')}
            >
              Belleza <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></svg>
            </button>
             <button 
              className={`filter-btn ${categoriaActiva === 'idiomas' ? 'active' : ''}`}
              onClick={() => setCategoriaActiva('idiomas')}
            >
              Idiomas <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></svg>
            </button>
        </div>

        <div className="cursos-list-container">
            {cursosFiltrados.length === 0 ? (
                <p>No hay cursos disponibles en esta categoría.</p>
            ) : null}
            
            {/* Se reemplazaron más de 5 mapeos de HTML diferentes por uno solo
                que ya incluye la corrección del "item.nombre" que estaba fallando */}
            {cursosFiltrados.map((item, index) => (
                <CardCurso
                    key={index}
                    img={item.imagen}
                    nombreCurso={item.nombre}
                    descripcionCurso={item.descripcion}
                    duracionCurso={item.duracion}
                    horarioCurso={item.horario}
                    tag={item.categoria}
                    meta={item.meta || "4.8 ★ (2k+ alumnos)"}
                />
            ))}
        </div>
    </div>
  )
}

export default Cursos
