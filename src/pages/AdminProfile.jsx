import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cursos'); // Empezamos en cursos para que lo pruebes

  // ESTADOS DE LA BASE DE DATOS
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]); 

  // ESTADOS PARA FORMULARIOS
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [estudianteActual, setEstudianteActual] = useState({ id: null, nombre: '', email: '', curso: '', estado: 'Activo' });
  const [nuevoCurso, setNuevoCurso] = useState({ nombre: '', categoria: '' });

  // CARGAR DATOS AL ABRIR LA PÁGINA
  useEffect(() => {
    obtenerEstudiantes();
    obtenerCursos(); 
  }, []);

  const obtenerEstudiantes = async () => {
    try {
      const respuesta = await fetch('http://localhost:3001/usuarios?role=cliente');
      setEstudiantes(await respuesta.json());
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
    }
  };

  const obtenerCursos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3001/cursos');
      setCursos(await respuesta.json());
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  const handleLogout = () => {
    navigate('/login'); 
  };

  // --- LÓGICA DE USUARIOS ---
  const abrirNuevoUsuario = () => {
    setEstudianteActual({ id: null, nombre: '', email: '', curso: '', estado: 'Activo' });
    setMostrarFormulario(true);
  };

  const abrirEditarUsuario = (estudiante) => {
    setEstudianteActual(estudiante);
    setMostrarFormulario(true);
  };

  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar a este estudiante?")) {
      await fetch(`http://localhost:3001/usuarios/${id}`, { method: 'DELETE' });
      setEstudiantes(estudiantes.filter(est => est.id !== id));
    }
  };

  const guardarUsuario = async (e) => {
    e.preventDefault();
    if (estudianteActual.id) {
      const res = await fetch(`http://localhost:3001/usuarios/${estudianteActual.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(estudianteActual)
      });
      const data = await res.json();
      setEstudiantes(estudiantes.map(est => est.id === data.id ? data : est));
    } else {
      const nuevoEst = { ...estudianteActual, role: 'cliente', password: '123' };
      delete nuevoEst.id;
      const res = await fetch('http://localhost:3001/usuarios', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nuevoEst)
      });
      setEstudiantes([...estudiantes, await res.json()]);
    }
    setMostrarFormulario(false);
  };

  // --- LÓGICA DE CURSOS ---
  const guardarCurso = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:3001/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCurso)
      });
      const cursoGuardado = await respuesta.json();
      setCursos([...cursos, cursoGuardado]); 
      setNuevoCurso({ nombre: '', categoria: '' }); 
    } catch (error) {
      console.error("Error al guardar curso:", error);
    }
  };

  const eliminarCurso = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este curso?")) {
      await fetch(`http://localhost:3001/cursos/${id}`, { method: 'DELETE' });
      setCursos(cursos.filter(curso => curso.id !== id));
    }
  };

  // -----------------------------------------------------------

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        const activos = estudiantes.filter(est => est.estado === 'Activo').length;
        const inactivos = estudiantes.filter(est => est.estado === 'Inactivo').length;

        return (
          <>
            <div className="page-header">
              <h1 className="page-title">Panel de Control de Cursos</h1>
            </div>
            <div className="stats-grid">
              <div className="glass-card">
                <h3 className="card-title">Estudiantes Activos</h3>
                <p className="card-value" style={{ color: '#28a745' }}>{activos}</p>
              </div>
              <div className="glass-card">
                <h3 className="card-title">Estudiantes Inactivos</h3>
                <p className="card-value" style={{ color: '#dc3545' }}>{inactivos}</p>
              </div>
              <div className="glass-card">
                <h3 className="card-title">Cursos Creados</h3>
                <p className="card-value" style={{ color: '#004aad' }}>{cursos.length}</p>
              </div>
            </div>
          </>
        );

      case 'usuarios':
        return (
          <>
            <div className="page-header">
              <h1 className="page-title">Gestión de Estudiantes</h1>
            </div>
            <div className="glass-card">
              <button onClick={abrirNuevoUsuario} style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>+ Nuevo Estudiante</button>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee', color: '#666' }}>
                    <th style={{ padding: '12px 0' }}>Nombre</th>
                    <th style={{ padding: '12px 0' }}>Correo</th>
                    <th style={{ padding: '12px 0' }}>Curso Inscrito</th>
                    <th style={{ padding: '12px 0' }}>Estado</th>
                    <th style={{ padding: '12px 0' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {estudiantes.map((est) => (
                    <tr key={est.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px 0' }}>{est.nombre}</td>
                      <td style={{ padding: '15px 0', color: '#666' }}>{est.email}</td>
                      <td style={{ padding: '15px 0', color: '#666' }}>{est.curso || 'Sin curso'}</td>
                      <td style={{ padding: '15px 0' }}>
                        <span style={{ background: est.estado === 'Activo' ? '#e6f4ea' : '#fce8e6', color: est.estado === 'Activo' ? '#1e8e3e' : '#d93025', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{est.estado || 'Inactivo'}</span>
                      </td>
                      <td style={{ padding: '15px 0', display: 'flex', gap: '8px' }}>
                        <button onClick={() => abrirEditarUsuario(est)} style={{ padding: '6px 12px', backgroundColor: '#004aad', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Editar</button>
                        <button onClick={() => eliminarUsuario(est.id)} style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {mostrarFormulario && (
                <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, 0)', backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', zIndex: 100, width: '400px' }}>
                  <h3 style={{ marginTop: 0 }}>{estudianteActual.id ? 'Editar Estudiante' : 'Nuevo Estudiante'}</h3>
                  <form onSubmit={guardarUsuario} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input type="text" placeholder="Nombre completo" required value={estudianteActual.nombre} onChange={(e) => setEstudianteActual({...estudianteActual, nombre: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}/>
                    <input type="email" placeholder="Correo electrónico" required value={estudianteActual.email} onChange={(e) => setEstudianteActual({...estudianteActual, email: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}/>
                    
                    <select value={estudianteActual.curso} onChange={(e) => setEstudianteActual({...estudianteActual, curso: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                      <option value="">-- Seleccionar Curso --</option>
                      {cursos.map(c => (
                        <option key={c.id} value={c.nombre}>{c.nombre}</option>
                      ))}
                    </select>

                    <select value={estudianteActual.estado} onChange={(e) => setEstudianteActual({...estudianteActual, estado: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Guardar</button>
                      <button type="button" onClick={() => setMostrarFormulario(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px' }}>Cancelar</button>
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
            <div className="page-header">
              <h1 className="page-title">Catálogo de Cursos</h1>
              <p className="page-subtitle">Crea y administra las clases disponibles en tu academia.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div className="glass-card" style={{ flex: '1' }}>
                <h3 className="card-title" style={{ marginBottom: '15px' }}>Agregar Nuevo Curso</h3>
                <form onSubmit={guardarCurso} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <input type="text" placeholder="Nombre del curso (Ej. Kendo Básico)" required value={nuevoCurso.nombre} onChange={(e) => setNuevoCurso({...nuevoCurso, nombre: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}/>
                  <input type="text" placeholder="Categoría (Ej. Artes Marciales)" required value={nuevoCurso.categoria} onChange={(e) => setNuevoCurso({...nuevoCurso, categoria: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}/>
                  <button type="submit" style={{ padding: '10px', backgroundColor: '#004aad', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Crear Curso</button>
                </form>
              </div>

              <div className="glass-card" style={{ flex: '2' }}>
                <h3 className="card-title" style={{ marginBottom: '15px' }}>Cursos Activos</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {cursos.length === 0 ? <p style={{ color: '#888' }}>No hay cursos creados.</p> : null}
                  {cursos.map(curso => (
                    <li key={curso.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                      <div>
                        <strong>{curso.nombre}</strong> <br/>
                        <span style={{ fontSize: '12px', color: '#666' }}>{curso.categoria}</span>
                      </div>
                      <button onClick={() => eliminarCurso(curso.id)} style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        );

      default:
        return <h2>Pestaña no encontrada</h2>;
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
          <li style={{ marginTop: 'auto', borderTop: '1px solid #1a3c5e' }} onClick={handleLogout}>Cerrar Sesión</li>
        </ul>
      </aside>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminProfile;