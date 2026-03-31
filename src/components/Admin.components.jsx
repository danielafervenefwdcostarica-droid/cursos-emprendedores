import React, { useState } from 'react';
import '../styles/Dashboard.css';
import '../styles/Admin.css';
import { postCursos, postUsuarios } from '../services/fetch';
import CloudinaryUpload from './CloudinaryUpload';
import CardCurso from './CardCursos';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminComponent = ({
  activeTab, setActiveTab, estudiantes, cursos, mensajes, mostrarFormulario,
  setMostrarFormulario, estudianteActual, setEstudianteActual,
  nuevoCurso, setNuevoCurso, handleLogout, abrirNuevoUsuario, eliminarUsuario, eliminarMensaje, guardarUsuario,
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
   const [precioCurso,setPrecioCurso] = useState("") // Nuevo estado para el precio del curso
   const [imagenCurso,setImagenCurso] = useState("")
   const [confirmarPassword, setConfirmarPassword] = useState("");

  async function guardarCurso(e) {
    if (e) e.preventDefault();
    const objCurso = {
      nombre: nombreCurso,
      categoria: categoriaCurso,
      descripcion: descripcionCurso,
      duracion: duracionCurso,
      horario: horarioCurso,
      precio: precioCurso, // Se añade el precio al objeto para guardarlo en la BD
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
    setPrecioCurso(""); // Limpiamos el estado del precio después de guardar
    setImagenCurso("");
  }

  // Función para formatear el precio con el símbolo de colón y miles
  const handlePrecioChange = (value, setter) => {
    // Solo permitimos números
    const soloNumeros = value.replace(/\D/g, '');
    if (soloNumeros === '') {
      setter('');
      return;
    }
    // Formateamos con el símbolo ₡ y separador de miles
    const formateado = '₡' + new Intl.NumberFormat('es-CR').format(soloNumeros);
    setter(formateado);
  };


  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': {
        const soloEstudiantes = estudiantes.filter(u => u.role !== 'admin');
        const activos = soloEstudiantes.filter(est => est.curso).length;
        const inactivos = soloEstudiantes.filter(est => !est.curso).length;
        const matriculadosTotal = activos;
        const totalDinero = matriculadosTotal * 10000; // Actualizado de 50 a 10000 para coincidir con el nuevo precio unitario en Colones

        // Categorías únicas de cursos creados
        const categorias = [...new Set(cursos.map(c => c.categoria).filter(Boolean))];

        // Para cada categoría: cuántos cursos hay y cuántos estudiantes están matriculados
        const datosGrafico = categorias.map(cat => {
          const cursosEnCat = cursos.filter(c => c.categoria === cat).map(c => c.nombre);
          const matriculados = soloEstudiantes.filter(est => cursosEnCat.includes(est.curso)).length;
          return {
            categoria: cat.charAt(0).toUpperCase() + cat.slice(1),
            'Matriculados en categoría': matriculados,
          };
        });

        return (
          <>
            <div className="page-header"><h1 className="page-title">Panel de Control de Cursos</h1></div>
            <div className="stats-grid">
              <div className="glass-card"><h3 className="card-title">Estudiantes Activos</h3><p className="card-value admin-activos">{activos}</p></div>
              <div className="glass-card"><h3 className="card-title">Estudiantes Inactivos</h3><p className="card-value admin-inactivos">{inactivos}</p></div>
              <div className="glass-card"><h3 className="card-title">Cursos Creados</h3><p className="card-value admin-cursos-count">{cursos.length}</p></div>
              <div className="glass-card"><h3 className="card-title">Mensajes Recibidos</h3><p className="card-value" style={{ color: '#2563eb' }}>{mensajes.length}</p></div>
            </div>

            <div className="glass-card dashboard-main-row" style={{ marginTop: '2rem', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              <div style={{ flex: '1 1 500px' }}>
                <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Estudiantes por Categoría de Curso</h3>
                {datosGrafico.length === 0 ? (
                  <p style={{ color: '#888', textAlign: 'center' }}>No hay categorías de cursos creadas aún.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={datosGrafico} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis dataKey="categoria" tick={{ fontSize: 13 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 13 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Matriculados en categoría" fill="#28a745" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              
              <div className="income-stat-card" style={{ flex: '0 0 250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid #eee', paddingLeft: '2rem', minWidth: '220px' }}>
                <h3 className="card-title">Ingresos Totales</h3>
                <p className="card-value" style={{ color: '#16a34a', fontSize: '2.5rem' }}>{totalDinero} ₡</p>
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                    <strong>{matriculadosTotal}</strong> matrículas habilitadas
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '5px 0 0 0' }}>
                    Precio unitario: <strong>₡10.000</strong>
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      }

      case 'usuarios':
        const listaEstudiantes = estudiantes.filter(u => u.role !== 'admin');
        const listaAdmins = estudiantes.filter(u => u.role === 'admin');

        return (
          <>
            <div className="page-header"><h1 className="page-title">Gestión de Usuarios</h1></div>
            
            <div className="glass-card" style={{ marginBottom: "2rem" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="card-title" style={{ margin: 0 }}>Sección de Estudiantes</h3>
                <button onClick={() => abrirNuevoUsuario('cliente')} className="admin-btn-nuevo">+ Nuevo Estudiante</button>
              </div>

              <table className="admin-table">
                <thead>
                  <tr className="admin-thead-tr">
                    <th className="admin-th">Nombre</th>
                    <th className="admin-th">Correo</th>
                    <th className="admin-th">Curso Inscrito</th>
                    <th className="admin-th">Estado</th>
                    <th className="admin-th">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {listaEstudiantes.length === 0 ? (
                    <tr><td colSpan="5" className="admin-td" style={{ textAlign: 'center', padding: '20px' }}>No hay estudiantes registrados.</td></tr>
                  ) : (
                    listaEstudiantes.map((est) => (
                      <tr key={est.id} className="admin-tbody-tr">
                        <td className="admin-td">{est.nombre}</td>
                        <td className="admin-td-secondary">{est.email}</td>
                        <td className="admin-td-secondary">{est.curso || 'Sin curso'}</td>
                        <td className="admin-td">
                          <span className={`admin-status-badge ${est.estado === 'Activo' || !est.estado ? 'admin-status-activo' : 'admin-status-inactivo'}`}>
                            {est.estado || 'Activo'}
                          </span>
                        </td>
                        <td className="admin-td-acciones">
                          <button onClick={() => abrirEditarUsuario(est)} className="admin-btn-editar">Editar</button>
                          <button onClick={() => eliminarUsuario(est.id)} className="admin-btn-eliminar">Eliminar</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="card-title" style={{ margin: 0 }}>Sección de Administradores</h3>
                <button onClick={() => abrirNuevoUsuario('admin')} className="admin-btn-nuevo" style={{ backgroundColor: "#1e3a8a" }}>+ Nuevo Administrador</button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr className="admin-thead-tr">
                    <th className="admin-th">Nombre</th>
                    <th className="admin-th">Correo</th>
                    <th className="admin-th">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {listaAdmins.length === 0 ? (
                    <tr><td colSpan="3" className="admin-td" style={{ textAlign: 'center', padding: '20px' }}>No hay administradores registrados.</td></tr>
                  ) : (
                    listaAdmins.map((adm) => (
                      <tr key={adm.id} className="admin-tbody-tr">
                        <td className="admin-td">{adm.nombre}</td>
                        <td className="admin-td-secondary">{adm.email}</td>
                        <td className="admin-td-acciones">
                          <button onClick={() => abrirEditarUsuario(adm)} className="admin-btn-editar">Editar</button>
                          <button onClick={() => eliminarUsuario(adm.id)} className="admin-btn-eliminar">Eliminar</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {mostrarFormulario && (
                <div className="admin-modal">
                  <h3 className="admin-modal-h3">
                    {estudianteActual.id 
                       ? (estudianteActual.role === 'admin' ? 'Editar Administrador' : 'Editar Estudiante')
                       : (estudianteActual.role === 'admin' ? 'Nuevo Administrador' : 'Nuevo Estudiante')}
                  </h3>
                  <form onSubmit={(e) => {
                    if (estudianteActual.role === 'admin' && !estudianteActual.id) {
                      const pwd = estudianteActual.password || "";
                      const hasKLength = pwd.length >= 8;
                      const hasUpperCase = /[A-Z]/.test(pwd);
                      const hasSpecialChar = /[?!&#*]/.test(pwd);

                      if (!hasKLength || !hasUpperCase || !hasSpecialChar) {
                        e.preventDefault();
                        alert("La contraseña debe tener:\n• Al menos 8 caracteres\n• Al menos una letra mayúscula\n• Al menos un signo especial (? ! & # *)");
                        return;
                      }

                      if (pwd !== confirmarPassword) {
                        e.preventDefault();
                        alert("Las contraseñas no coinciden");
                        return;
                      }
                    }
                    guardarUsuario(e);
                  }} className="admin-form">
                    <input type="text" placeholder="Nombre completo" required value={estudianteActual.nombre} onChange={(e) => setEstudianteActual({...estudianteActual, nombre: e.target.value})} className="admin-input"/>
                    <input type="email" placeholder="Correo electrónico" required value={estudianteActual.email} onChange={(e) => setEstudianteActual({...estudianteActual, email: e.target.value})} className="admin-input"/>
                    
                    {estudianteActual.role !== 'admin' && (
                      <select value={estudianteActual.curso} onChange={(e) => setEstudianteActual({...estudianteActual, curso: e.target.value})} className="admin-select">
                        <option value="">-- Seleccionar Curso --</option>
                        {cursos.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                      </select>
                    )}

                    {estudianteActual.role === 'admin' && !estudianteActual.id && (
                      <>
                        <input type="password" placeholder="Contraseña" required value={estudianteActual.password || ''} onChange={(e) => setEstudianteActual({...estudianteActual, password: e.target.value})} className="admin-input"/>
                        <div style={{ margin: '10px 0', fontSize: '13px', textAlign: 'left', background: '#f8f9fa', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
                          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#333' }}>Requisitos de la contraseña:</p>
                          <ul style={{ listStyleType: 'none', paddingLeft: '0', margin: '0' }}>
                            <li style={{ color: (estudianteActual.password || '').length >= 8 ? '#16a34a' : '#dc2626', marginBottom: '3px' }}>
                              {(estudianteActual.password || '').length >= 8 ? '✓' : '✗'} Al menos 8 caracteres
                            </li>
                            <li style={{ color: /[A-Z]/.test(estudianteActual.password || '') ? '#16a34a' : '#dc2626', marginBottom: '3px' }}>
                              {/[A-Z]/.test(estudianteActual.password || '') ? '✓' : '✗'} Al menos una letra mayúscula
                            </li>
                            <li style={{ color: /[?!&#*]/.test(estudianteActual.password || '') ? '#16a34a' : '#dc2626' }}>
                              {/[?!&#*]/.test(estudianteActual.password || '') ? '✓' : '✗'} Al menos un signo especial (? ! & # *)
                            </li>
                          </ul>
                        </div>
                        <input type="password" placeholder="Confirmar contraseña" required value={confirmarPassword} onChange={(e) => setConfirmarPassword(e.target.value)} className="admin-input"/>
                      </>
                    )}

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
                  <input type="text" placeholder="Nombre (Ej. Kendo Básico)" required value={nombreCurso} onChange={(e) => setNombreCurso(e.target.value)} className="admin-input"/>
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
                  {/* Input de precio con formateo automático de Colones */}
                  <input 
                    type="text" 
                    placeholder="Precio (Ej: ₡10.000)" 
                    required 
                    value={precioCurso} 
                    onChange={(e) => handlePrecioChange(e.target.value, setPrecioCurso)} 
                    className="admin-input"
                  />
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
                    <li key={curso.id} className="admin-curso-li">
                      <CardCurso 
                        img={curso.imagen}
                        nombreCurso={curso.nombre}
                        descripcionCurso={curso.descripcion}
                        duracionCurso={curso.duracion}
                        horarioCurso={curso.horario}
                        precioCurso={curso.precio} // Pasamos el precio a la tarjeta de previsualización
                        tag={curso.categoria}
                        meta={curso.meta || curso.duracion}
                      />
                      <div className="admin-curso-actions">
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
                  {/* Input de precio en el modal de edición con la misma lógica de formateo */}
                  <input 
                    type="text" 
                    name="precio" 
                    placeholder="Precio" 
                    value={CursoActual.precio || ''} 
                    onChange={(e) => {
                      const soloNumeros = e.target.value.replace(/\D/g, '');
                      const formateado = soloNumeros ? '₡' + new Intl.NumberFormat('es-CR').format(soloNumeros) : '';
                      manejarCambio({ target: { name: 'precio', value: formateado } });
                    }} 
                    className="admin-input"
                  />
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
        {/* Nombre/marca del panel que aparece en la parte superior del sidebar */}
        <div className="sidebar-brand">Panel Administrativo</div>
        <ul className="sidebar-menu">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
          {/* Enlace a la sección de usuarios (estudiantes y admins) */}
          <li className={activeTab === 'usuarios' ? 'active' : ''} onClick={() => setActiveTab('usuarios')}>Gestión de Usuarios</li>
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