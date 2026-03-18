import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const ClientProfile = () => {
  const navigate = useNavigate();

  // 1. ESTADO DEL USUARIO: Buscamos en la memoria quién inició sesión
  const [userData, setUserData] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      const parsedUser = JSON.parse(usuarioGuardado);
      return {
        ...parsedUser,
        plan: "Premium", // Lo dejamos simulado por ahora
        fechaRegistro: "2023", // Lo dejamos simulado
        cursoActual: parsedUser.curso || "" // Leemos si ya tiene un curso en la BD
      };
    }
    // Si por alguna razón entra sin login, mostramos esto vacío:
    return { nombre: "Estudiante", email: "", plan: "Básico", fechaRegistro: "", cursoActual: "" };
  });

  // 2. ESTADOS PARA EDICIÓN Y CURSOS
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userData);
  const [cursosDisponibles, setCursosDisponibles] = useState([]);

  // 3. CARGAR CURSOS DESDE LA BASE DE DATOS
  useEffect(() => {
    const obtenerCursos = async () => {
      try {
        const respuesta = await fetch('http://localhost:3001/cursos');
        setCursosDisponibles(await respuesta.json());
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
      }
    };
    obtenerCursos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogueado'); // Borramos la memoria al salir
    navigate('/login');
  };

  const iniciarEdicion = () => {
    setEditForm(userData);
    setIsEditing(true);
  };

  const cancelarEdicion = () => {
    setIsEditing(false);
  };

  const manejarCambios = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // --- NUEVO: GUARDAR CAMBIOS REALES EN LA BASE DE DATOS ---
  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      // 1. Guardamos en el db.json (para asegurarnos de usar la palabra "curso" en la BD y no "cursoActual")
      const datosParaBD = { ...editForm, curso: editForm.cursoActual };
      
      if (userData.id) {
        await fetch(`http://localhost:3001/usuarios/${userData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datosParaBD)
        });
      }

      // 2. Actualizamos la vista y la memoria local
      setUserData(editForm);
      localStorage.setItem('usuarioLogueado', JSON.stringify(datosParaBD));
      setIsEditing(false);
      alert(`¡Genial! Datos actualizados correctamente.`);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="main-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="profile-header">
            <div className="avatar">{userData.nombre ? userData.nombre.substring(0, 2).toUpperCase() : "ES"}</div>
            <div>
              <h1 className="page-title">Bienvenido, {userData.nombre}</h1>
              <p className="page-subtitle">Gestiona tu cuenta y aprendizaje desde aquí.</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Cerrar Sesión
          </button>
        </div>

        <div className="stats-grid">
          <div className="glass-card">
            <h3 className="card-title">Estado de Cuenta</h3>
            <p className="card-value" style={{ color: '#28a745' }}>Activa</p>
          </div>
          <div className="glass-card">
            <h3 className="card-title">Plan / Suscripción</h3>
            <p className="card-value">{userData.plan}</p>
          </div>
          <div className="glass-card">
            <h3 className="card-title">Curso Actual</h3>
            <p className="card-value" style={{ fontSize: '20px', marginTop: '8px', color: userData.cursoActual ? '#004aad' : '#888' }}>
              {userData.cursoActual || "Sin matricular"}
            </p>
          </div>
        </div>

        <div className="glass-card" style={{ marginTop: '20px' }}>
          <h3 className="card-title" style={{ color: '#1a1a1a', fontSize: '18px' }}>Información Personal y Matrícula</h3>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '15px 0' }} />
          
          {isEditing ? (
            <form onSubmit={guardarCambios} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Nombre Completo</label>
                <input type="text" name="nombre" value={editForm.nombre} onChange={manejarCambios} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Correo Electrónico</label>
                <input type="email" name="email" value={editForm.email} onChange={manejarCambios} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#004aad' }}>Elegir Curso / Matrícula</label>
                <select 
                  name="cursoActual" 
                  value={editForm.cursoActual} 
                  onChange={manejarCambios} 
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '2px solid #004aad', backgroundColor: '#f8faff' }}
                  required
                >
                  <option value="">-- Selecciona un curso disponible --</option>
                  {cursosDisponibles.map(curso => (
                    <option key={curso.id} value={curso.nombre}>
                      {curso.nombre} ({curso.categoria})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Guardar Cambios</button>
                <button type="button" onClick={cancelarEdicion} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
              </div>
            </form>

          ) : (
            <div>
              <p style={{ margin: '10px 0' }}><strong>Nombre Completo:</strong> {userData.nombre}</p>
              <p style={{ margin: '10px 0' }}><strong>Correo Electrónico:</strong> {userData.email}</p>
              <p style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f8faff', borderLeft: '4px solid #004aad', borderRadius: '4px' }}>
                <strong>Curso Matriculado:</strong> {userData.cursoActual || "Aún no has elegido un curso. Haz clic en Editar Perfil."}
              </p>
              
              <button onClick={iniciarEdicion} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#004aad', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                Editar Perfil y Matrícula
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ClientProfile;