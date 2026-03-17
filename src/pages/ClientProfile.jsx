import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const ClientProfile = () => {
  const navigate = useNavigate();

  // 1. Datos del usuario (Por ahora simulados, luego vendrán del db.json al hacer login)
  const [userData, setUserData] = useState({
    nombre: "Aaron Lorenzo",
    email: "aaronqlv@gmail.com",
    plan: "Premium",
    fechaRegistro: "Octubre 2023",
    cursoActual: "Desarrollo Web Full Stack" // Añadido para la temática de cursos
  });

  // 2. Estados para controlar la edición
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userData); // Copia temporal para editar

  // Función para cerrar sesión
  const handleLogout = () => {
    navigate('/login');
  };

  // --- Funciones de Edición ---
  const iniciarEdicion = () => {
    setEditForm(userData); // Nos aseguramos de tener los datos actuales
    setIsEditing(true);
  };

  const cancelarEdicion = () => {
    setIsEditing(false);
  };

  const manejarCambios = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const guardarCambios = (e) => {
    e.preventDefault();
    // Aquí en el futuro harás un fetch con método PUT o PATCH a tu db.json
    console.log("Guardando en base de datos:", editForm);
    
    setUserData(editForm); // Actualizamos los datos visuales
    setIsEditing(false); // Salimos del modo edición
  };

  return (
    <div className="dashboard-layout">
      <div className="main-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Encabezado con Botón de Cerrar Sesión */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="profile-header">
            {/* El avatar toma las iniciales del nombre */}
            <div className="avatar">{userData.nombre.substring(0, 2).toUpperCase()}</div>
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

        {/* Tarjetas de Resumen */}
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
            <p className="card-value" style={{ fontSize: '20px', marginTop: '8px' }}>{userData.cursoActual}</p>
          </div>
        </div>

        {/* Sección de Información Personal (Modo Vista o Modo Edición) */}
        <div className="glass-card" style={{ marginTop: '20px' }}>
          <h3 className="card-title" style={{ color: '#1a1a1a', fontSize: '18px' }}>Información Personal</h3>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '15px 0' }} />
          
          {isEditing ? (
            /* --- MODO EDICIÓN (FORMULARIO) --- */
            <form onSubmit={guardarCambios} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Nombre Completo</label>
                <input 
                  type="text" 
                  name="nombre"
                  value={editForm.nombre}
                  onChange={manejarCambios}
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Correo Electrónico</label>
                <input 
                  type="email" 
                  name="email"
                  value={editForm.email}
                  onChange={manejarCambios}
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                  required
                />
              </div>

              {/* El plan y la fecha de registro normalmente no los edita el usuario, así que los dejamos como texto */}
              <p style={{ margin: '5px 0' }}><strong>Miembro desde:</strong> {userData.fechaRegistro}</p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Guardar Cambios
                </button>
                <button type="button" onClick={cancelarEdicion} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Cancelar
                </button>
              </div>
            </form>

          ) : (
            /* --- MODO VISTA (TEXTO NORMAL) --- */
            <div>
              <p style={{ margin: '10px 0' }}><strong>Nombre Completo:</strong> {userData.nombre}</p>
              <p style={{ margin: '10px 0' }}><strong>Correo Electrónico:</strong> {userData.email}</p>
              <p style={{ margin: '10px 0' }}><strong>Miembro desde:</strong> {userData.fechaRegistro}</p>
              
              <button 
                onClick={iniciarEdicion}
                style={{ 
                  marginTop: '20px', padding: '10px 20px', backgroundColor: '#004aad', 
                  color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
                }}>
                Editar Perfil
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ClientProfile;