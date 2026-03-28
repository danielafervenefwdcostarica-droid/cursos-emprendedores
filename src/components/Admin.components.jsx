import React, { useState } from 'react';
import '../styles/Dashboard.css';
import '../styles/Admin.css';
import { postCursos, postUsuarios } from '../services/fetch';
import CloudinaryUpload from './CloudinaryUpload';
import CardCurso from './CardCursos';

const AdminComponent = ({
  activeTab, setActiveTab, estudiantes, cursos, mensajes, mostrarFormulario,
  setMostrarFormulario, estudianteActual, setEstudianteActual,
  nuevoCurso, setNuevoCurso, handleLogout, abrirNuevoUsuario,
  abrirEditarUsuario, eliminarUsuario, eliminarMensaje, guardarUsuario,
  guardarCurso, eliminarCurso, onCursoCreated,
  editar, manejarCambio, guardarCambios, editando, CursoActual,setEditando
}) => {
  /* PROPS del componente, se construye una estructura para hacer que el componente sea reutilizable
    Este componente podrá tener la misma estructura con distintos comportamientos 
      Cada prop que se le pasa *lo que va entre parentesis y llaves* construye y hace la estructura


      En la página donde se llama, es donde se le pasan los datos


    */
   const [nombreCurso,setNombreCurso] = useState("")
   const [categoriaCurso,setCategoriaCurso] = useState("")
   const [descripcionCurso,setDescripcionCurso] = useState("")
   const [duracionCurso,setDuracionCurso] = useState("")
   const [horarioCurso,setHorarioCurso] = useState("")
   const [imagenCurso,setImagenCurso] = useState("")

  async function guardarCurso(e) {
    if (e) e.preventDefault();
    const objCurso = {
      nombre: nombreCurso,
      categoria: categoriaCurso,
      descripcion: descripcionCurso,
      duracion: duracionCurso,
      horario: horarioCurso,
      imagen: imagenCurso,
      tag: categoriaCurso,
      meta: duracionCurso
    }
    const nuevoCursoCreado = await postCursos(objCurso);
    if (onCursoCreated) onCursoCreated(nuevoCursoCreado);
    setNombreCurso("");
    setCategoriaCurso("");
    setDescripcionCurso("");
    setDuracionCurso("");
    setHorarioCurso("");
    setImagenCurso("");
  }


  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        // NUEVO: El filtro de estudiantes activos ahora cuenta no solo a los que dicen "Activo",
        // sino también a los que no tienen el estado definido (!est.estado). Esto es porque al
        // registrar un estudiante nuevo desde el registro, por defecto no traen estado.
        const activos = estudiantes.filter(est => est.estado === 'Activo' || !est.estado).length;
        const inactivos = estudiantes.filter(est => est.estado === 'Inactivo').length;
        return (
          <>
            <div className="page-header"><h1 className="page-title">Panel de Control de Cursos</h1></div>
            <div className="stats-grid">
              <div className="glass-card"><h3 className="card-title">Estudiantes Activos</h3><p className="card-value admin-activos">{activos}</p></div>
              <div className="glass-card"><h3 className="card-title">Estudiantes Inactivos</h3><p className="card-value admin-inactivos">{inactivos}</p></div>
              <div className="glass-card"><h3 className="card-title">Cursos Creados</h3><p className="card-value admin-cursos-count">{cursos.length}</p></div>
              <div className="glass-card"><h3 className="card-title">Mensajes Recibidos</h3><p className="card-value" style={{ color: '#2563eb' }}>{mensajes.length}</p></div>
            </div>
          </>
        );

      case 'usuarios':
        return (
          <>
            <div className="page-header"><h1 className="page-title">Gestión de Estudiantes</h1></div>
            <div className="glass-card">
              <button onClick={abrirNuevoUsuario} className="admin-btn-nuevo">+ Nuevo Estudiante</button>
              <table className="admin-table">
                <thead>
                  <tr className="admin-thead-tr">
                    <th className="admin-th">Nombre</th><th className="admin-th">Correo</th><th className="admin-th">Curso Inscrito</th><th className="admin-th">Estado</th><th className="admin-th">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {estudiantes.map((est) => (
                    <tr key={est.id} className="admin-tbody-tr">
                      <td className="admin-td">{est.nombre}</td>
                      <td className="admin-td-secondary">{est.email}</td>
                      <td className="admin-td-secondary">{est.curso || 'Sin curso'}</td>
                      
                      {/* NUEVO: Las etiquetas de la tabla ahora asignan "Activo" (color verde) a los estudiantes
                          recién registrados en lugar de mostrarlos visualmente como "Inactivos" por error. */}
                      <td className="admin-td"><span className={`admin-status-badge ${est.estado === 'Activo' || !est.estado ? 'admin-status-activo' : 'admin-status-inactivo'}`}>{est.estado || 'Activo'}</span></td>
                      
                      <td className="admin-td-acciones">
                        <button onClick={() => eliminarUsuario(est.id)} className="admin-btn-eliminar">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {mostrarFormulario && (
                <div className="admin-modal">
                  <h3 className="admin-modal-h3">{estudianteActual.id ? 'Editar Estudiante' : 'Nuevo Estudiante'}</h3>
                  <form onSubmit={guardarUsuario} className="admin-form">
                    <input type="text" placeholder="Nombre completo" required value={estudianteActual.nombre} onChange={(e) => setEstudianteActual({...estudianteActual, nombre: e.target.value})} className="admin-input"/>
                    <input type="email" placeholder="Correo electrónico" required value={estudianteActual.email} onChange={(e) => setEstudianteActual({...estudianteActual, email: e.target.value})} className="admin-input"/>
                    <select value={estudianteActual.curso} onChange={(e) => setEstudianteActual({...estudianteActual, curso: e.target.value})} className="admin-select">
                      <option value="">-- Seleccionar Curso --</option>
                      {cursos.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                    </select>
                    <select value={estudianteActual.estado} onChange={(e) => setEstudianteActual({...estudianteActual, estado: e.target.value})} className="admin-select">
                      <option value="Activo">Activo</option><option value="Inactivo">Inactivo</option>
                    </select>
                    <div className="admin-form-buttons">
                      <button type="submit" className="admin-btn-guardar">Guardar</button>
                      <button type="button" onClick={() => setMostrarFormulario(false)} className="admin-btn-cancelar">Cancelar</button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </>
        );

      case 'cursos':
        return (
          <>
            <div className="page-header"><h1 className="page-title">Catálogo de Cursos</h1></div>
            <div className="admin-cursos-container">
              <div className="glass-card admin-cursos-left">
                <h3 className="card-title admin-cursos-h3">Agregar Nuevo Curso</h3>
                <form onSubmit={guardarCurso} className="admin-form">
                  <input type="text" placeholder="Nombre (Ej. Kendo Básico)" required value={nombreCurso}onChange={(e) => setNombreCurso(e.target.value)} className="admin-input"/>
                  <select className="admin-input" name="categoria" id="categoria" value={categoriaCurso} onChange={(e)=>setCategoriaCurso(e.target.value)}>
                    <option value="">Seleccione la categoría del curso</option>
                    <option value="idiomas">Idiomas</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="artesania">Artesania</option>
                    <option value="musica">Musica</option>
                    <option value="belleza">Belleza</option>
                  </select>


                  <input type="text" placeholder="Descripción del curso" required value={descripcionCurso || ''} onChange={(e) => setDescripcionCurso(e.target.value)} className="admin-input"/>
                  <input type="text" placeholder="Duración del curso" required value={duracionCurso || ''} onChange={(e) => setDuracionCurso(e.target.value)} className="admin-input"/>
                  <input type="text" placeholder="Horario del curso" required value={horarioCurso || ''} onChange={(e) => setHorarioCurso(e.target.value)} className="admin-input"/>
                  <CloudinaryUpload buttonText="Subir Imagen del Curso" onImageUpload={(url) => setImagenCurso(url)} />
                  {imagenCurso && <img src={imagenCurso} alt="Vista previa" className="admin-preview-img" />}
                  <button type="button" onClick={guardarCurso} className="admin-btn-crear-curso">Crear Curso</button>
                </form>
              </div>
              <div className="glass-card admin-cursos-right">
                <h3 className="card-title admin-cursos-h3">Cursos Activos</h3>
                <ul className="admin-cursos-ul">
                  {cursos.length === 0 ? <p className="admin-no-cursos">No hay cursos creados.</p> : null}
                  {cursos.map(curso => (
                    <li key={curso.id} className="admin-curso-li" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <CardCurso 
                        img={curso.imagen}
                        nombreCurso={curso.nombre}
                        descripcionCurso={curso.descripcion}
                        duracionCurso={curso.duracion}
                        horarioCurso={curso.horario}
                        tag={curso.categoria}
                        meta={curso.meta || curso.duracion}
                      />
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '-15px', zIndex: 10 }}>
                        <button onClick={() => editar(curso)} className="admin-btn-editar">Editar</button>
                        <button onClick={() => eliminarCurso(curso.id)} className="admin-btn-eliminar">Eliminar</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* MODAL PARA EDITAR CURSOS - Aparece cuando se hace clic en "Editar" en un curso */}
            {editando && CursoActual && (
              <div className="admin-modal">
                <h3 className="admin-modal-h3">Editar Curso</h3>
                <form onSubmit={(e) => { e.preventDefault(); guardarCambios(); }} className="admin-form">
                  <input type="text" name="nombre" placeholder="Nombre del curso" value={CursoActual.nombre || ''} onChange={manejarCambio} className="admin-input"/>
                  <input type="text" name="categoria" placeholder="Categoría" value={CursoActual.categoria || ''} onChange={manejarCambio} className="admin-input"/>
                  <input type="text" name="descripcion" placeholder="Descripción" value={CursoActual.descripcion || ''} onChange={manejarCambio} className="admin-input"/>
                  <input type="text" name="duracion" placeholder="Duración" value={CursoActual.duracion || ''} onChange={manejarCambio} className="admin-input"/>
                  <input type="text" name="horario" placeholder="Horario" value={CursoActual.horario || ''} onChange={manejarCambio} className="admin-input"/>
                  <div className="admin-form-buttons">
                    <button type="submit" className="admin-btn-guardar">Guardar Cambios</button>
                    <button type="button" onClick={() => setEditando(false)} className="admin-btn-cancelar">Cancelar</button>
                  </div>
                </form>
              </div>
            )}
          </>
        );
      case 'mensajes':
        return (
          <>
            <div className="page-header"><h1 className="page-title">Mensajes de Contacto</h1></div>
            <div className="glass-card">
              <table className="admin-table">
                <thead>
                  <tr className="admin-thead-tr">
                    <th className="admin-th">ID</th>
                    <th className="admin-th">Nombre</th>
                    <th className="admin-th">Correo</th>
                    <th className="admin-th">Asunto</th>
                    <th className="admin-th">Mensaje</th>
                    <th className="admin-th">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mensajes.length === 0 ? (
                    <tr><td colSpan="6" className="admin-td" style={{ textAlign: 'center', padding: '40px' }}>No hay mensajes nuevos.</td></tr>
                  ) : (
                    mensajes.map((msg) => (
                      <tr key={msg.id} className="admin-tbody-tr">
                        <td className="admin-td-secondary">{msg.id}</td>
                        <td className="admin-td" style={{ fontWeight: '600' }}>{msg.nombre}</td>
                        <td className="admin-td-secondary">{msg.email}</td>
                        <td className="admin-td"><span className="admin-status-badge admin-status-activo" style={{ background: '#eff6ff', color: '#2563eb' }}>{msg.asunto}</span></td>
                        <td className="admin-td-secondary" style={{ maxWidth: '300px', whiteSpace: 'normal' }}>{msg.mensaje}</td>
                        <td className="admin-td-acciones">
                          <button onClick={() => eliminarMensaje(msg.id)} className="admin-btn-eliminar">Eliminar</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        );
      default: return <h2>Pestaña no encontrada</h2>;
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">CursosAdmin</div>
        <ul className="sidebar-menu">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
          <li className={activeTab === 'usuarios' ? 'active' : ''} onClick={() => setActiveTab('usuarios')}>Gestión de Estudiantes</li>
          <li className={activeTab === 'cursos' ? 'active' : ''} onClick={() => setActiveTab('cursos')}>Gestión de Cursos</li>
          <li className={activeTab === 'mensajes' ? 'active' : ''} onClick={() => setActiveTab('mensajes')}>Mensajes Recibidos</li>
          <li className="admin-logout-li" onClick={handleLogout}>Cerrar Sesión</li>
        </ul>
      </aside>
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default AdminComponent;