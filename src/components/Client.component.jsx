// src/components/Client.component.jsx
import React from 'react';
import '../styles/Dashboard.css';
import '../styles/Cliente.css';

const ClientComponent = ({
  userData, isEditing, editForm, cursosDisponibles,
  handleLogout, iniciarEdicion, cancelarEdicion, 
  manejarCambios, guardarCambios
}) => {
  return (
    <div className="dashboard-layout">
      <div className="main-content client-main-content">
        
        {/* Encabezado */}
        <div className="client-header">
          <div className="profile-header">
            <div className="avatar">
              {userData.nombre ? userData.nombre.substring(0, 2).toUpperCase() : "ES"}
            </div>
            <div>
              <h1 className="page-title">Bienvenido, {userData.nombre}</h1>
              <p className="page-subtitle">Gestiona tu cuenta y aprendizaje desde aquí.</p>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="client-logout-btn">
            Cerrar Sesión
          </button>
        </div>

        {/* Tarjetas de Estadísticas */}
        <div className="stats-grid">
          <div className="glass-card">
            <h3 className="card-title">Estado de Cuenta</h3>
            <p className="card-value client-card-value-active">Activa</p>
          </div>
          <div className="glass-card">
            <h3 className="card-title">Plan / Suscripción</h3>
            <p className="card-value">{userData.plan}</p>
          </div>
          <div className="glass-card">
            <h3 className="card-title">Curso Actual</h3>
            <p className={`card-value client-card-value-course ${userData.cursoActual ? 'active' : 'inactive'}`}>
              {userData.cursoActual || "Sin matricular"}
            </p>
          </div>
        </div>

        {/* Formulario y Datos */}
        <div className="glass-card client-glass-card-margin">
          <h3 className="card-title client-card-title-custom">Información Personal y Matrícula</h3>
          <hr className="client-hr" />
          
          {isEditing ? (
            <form onSubmit={guardarCambios} className="client-edit-form">
              <div>
                <label className="client-form-label">Nombre Completo</label>
                <input type="text" name="nombre" value={editForm.nombre} onChange={manejarCambios} className="client-form-input" required />
              </div>
              
              <div>
                <label className="client-form-label">Correo Electrónico</label>
                <input type="email" name="email" value={editForm.email} onChange={manejarCambios} className="client-form-input" required />
              </div>

              <div>
                <label className="client-form-label client-form-label-course">Elegir Curso / Matrícula</label>
                <select 
                  name="cursoActual" 
                  value={editForm.cursoActual} 
                  onChange={manejarCambios} 
                  className="client-form-select" 
                  required
                >
                  <option value="">-- Selecciona un curso --</option>
                  {cursosDisponibles.map(curso => (
                    <option key={curso.id} value={curso.nombre}>
                      {curso.nombre} ({curso.categoria})
                     </option>
                    
                    
                  



                  ))}
                </select>
              </div>

              <div className="client-form-buttons">
                <button type="submit" className="client-btn-save">Guardar Cambios</button>
                <button type="button" onClick={cancelarEdicion} className="client-btn-cancel">Cancelar</button>
              </div>
            </form>
          ) : (
            <div>
              <p className="client-info-p"><strong>Nombre Completo:</strong> {userData.nombre}</p>
              <p className="client-info-p"><strong>Correo Electrónico:</strong> {userData.email}</p>
              <p className="client-info-p"><strong>Miembro desde:</strong> {userData.fechaRegistro}</p>
              <p className="client-course-p">
                <strong>Curso Matriculado:</strong> {userData.cursoActual || "Aún no has elegido un curso."}
              </p>
              <button 
                onClick={iniciarEdicion} 
                className="client-btn-edit">
                Editar Perfil y Matrícula
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientComponent;