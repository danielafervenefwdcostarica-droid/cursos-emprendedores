import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('usuarios'); // Empezamos en usuarios para que lo pruebes

  // 1. ESTADO DE LOS ESTUDIANTES (Datos de prueba con temática de cursos)
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: 'María González', correo: 'maria.g@email.com', curso: 'Desarrollo Web Full Stack', estado: 'Activo' },
    { id: 2, nombre: 'Carlos Ruiz', correo: 'cruiz99@email.com', curso: 'Introducción al Kendo y Katana', estado: 'Inactivo' },
    { id: 3, nombre: 'Ana Silva', correo: 'ana.s@email.com', curso: 'Filosofía Budista y Meditación', estado: 'Activo' }
  ]);

  // 2. ESTADOS PARA EL FORMULARIO (Agregar / Editar)
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [estudianteActual, setEstudianteActual] = useState({ id: null, nombre: '', correo: '', curso: '', estado: 'Activo' });

  // Función para cerrar sesión
  const handleLogout = () => {
    navigate('/login'); 
  };

  // --- FUNCIONES DEL CRUD (Crear, Leer, Actualizar, Borrar) ---
  
  const abrirNuevoUsuario = () => {
    setEstudianteActual({ id: null, nombre: '', correo: '', curso: '', estado: 'Activo' });
    setMostrarFormulario(true);
  };

  const abrirEditarUsuario = (estudiante) => {
    setEstudianteActual(estudiante);
    setMostrarFormulario(true);
  };

  const eliminarUsuario = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar a este estudiante?")) {
      setEstudiantes(estudiantes.filter(est => est.id !== id));
    }
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    if (estudianteActual.id) {
      // Si ya tiene ID, lo estamos editando
      setEstudiantes(estudiantes.map(est => est.id === estudianteActual.id ? estudianteActual : est));
    } else {
      // Si no tiene ID, es uno nuevo
      const nuevoEstudiante = { ...estudianteActual, id: Date.now() };
      setEstudiantes([...estudiantes, nuevoEstudiante]);
    }
    setMostrarFormulario(false); // Cerramos la ventana
  };

  // -----------------------------------------------------------

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="page-header">
              <h1 className="page-title">Panel de Control de Cursos</h1>
              <p className="page-subtitle">Resumen general de tu academia virtual.</p>
            </div>
            <div className="stats-grid">
              <div className="glass-card">
                <h3 className="card-title">Estudiantes Activos</h3>
                <p className="card-value">{estudiantes.length}</p>
              </div>
              <div className="glass-card">
                <h3 className="card-title">Cursos Impartidos</h3>
                <p className="card-value" style={{ color: '#28a745' }}>12</p>
              </div>
              <div className="glass-card">
                <h3 className="card-title">Ventas del Mes</h3>
                <p className="card-value">$4,230</p>
              </div>
            </div>
          </>
        );

      case 'usuarios':
        return (
          <>
            <div className="page-header">
              <h1 className="page-title">Gestión de Estudiantes</h1>
              <p className="page-subtitle">Administra las matrículas y accesos a los cursos.</p>
            </div>
            
            <div className="glass-card" style={{ position: 'relative' }}>
              <button 
                onClick={abrirNuevoUsuario}
                style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                + Nuevo Estudiante
              </button>

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
                      <td style={{ padding: '15px 0', fontWeight: '500' }}>{est.nombre}</td>
                      <td style={{ padding: '15px 0', color: '#666' }}>{est.correo}</td>
                      <td style={{ padding: '15px 0', color: '#666' }}>{est.curso}</td>
                      <td style={{ padding: '15px 0' }}>
                        <span style={{ 
                          background: est.estado === 'Activo' ? '#e6f4ea' : '#fce8e6', 
                          color: est.estado === 'Activo' ? '#1e8e3e' : '#d93025', 
                          padding: '4px 8px', borderRadius: '4px', fontSize: '12px' 
                        }}>
                          {est.estado}
                        </span>
                      </td>
                      <td style={{ padding: '15px 0', display: 'flex', gap: '8px' }}>
                        <button onClick={() => abrirEditarUsuario(est)} style={{ padding: '6px 12px', backgroundColor: '#004aad', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Editar</button>
                        <button onClick={() => eliminarUsuario(est.id)} style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* VENTANA EMERGENTE (MODAL) PARA FORMULARIO */}
              {mostrarFormulario && (
                <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, 0)', backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', zIndex: 100, width: '400px', border: '1px solid #ddd' }}>
                  <h3 style={{ marginTop: 0 }}>{estudianteActual.id ? 'Editar Estudiante' : 'Nuevo Estudiante'}</h3>
                  <form onSubmit={guardarUsuario} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input type="text" placeholder="Nombre completo" required value={estudianteActual.nombre} onChange={(e) => setEstudianteActual({...estudianteActual, nombre: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}/>
                    <input type="email" placeholder="Correo electrónico" required value={estudianteActual.correo} onChange={(e) => setEstudianteActual({...estudianteActual, correo: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}/>
                    <input type="text" placeholder="Curso (Ej. Karate Nivel 1)" required value={estudianteActual.curso} onChange={(e) => setEstudianteActual({...estudianteActual, curso: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}/>
                    <select value={estudianteActual.estado} onChange={(e) => setEstudianteActual({...estudianteActual, estado: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Guardar</button>
                      <button type="button" onClick={() => setMostrarFormulario(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancelar</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </>
        );

      case 'reportes':
        return (
          <div className="page-header">
            <h1 className="page-title">Reportes y Ventas</h1>
            <p className="page-subtitle">Próximamente: Gráficos de los cursos más vendidos y rendimiento mensual.</p>
          </div>
        );

      case 'configuracion':
        return (
          <div className="page-header">
            <h1 className="page-title">Configuración de la Academia</h1>
            <p className="page-subtitle">Ajustes de métodos de pago, certificados y diseño de la plataforma.</p>
          </div>
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
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            Dashboard
          </li>
          <li className={activeTab === 'usuarios' ? 'active' : ''} onClick={() => setActiveTab('usuarios')}>
            Gestión de Estudiantes
          </li>
          <li className={activeTab === 'reportes' ? 'active' : ''} onClick={() => setActiveTab('reportes')}>
            Reportes y Ventas
          </li>
          <li className={activeTab === 'configuracion' ? 'active' : ''} onClick={() => setActiveTab('configuracion')}>
            Configuración
          </li>
          <li style={{ marginTop: 'auto', borderTop: '1px solid #1a3c5e' }} onClick={handleLogout}>
            Cerrar Sesión
          </li>
        </ul>
      </aside>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminProfile;