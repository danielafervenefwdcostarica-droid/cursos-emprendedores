// src/components/Client.component.jsx
import React, { useState } from 'react';
import '../styles/Dashboard.css';
import '../styles/Cliente.css';

const ClientComponent = ({
  userData, isEditing, editForm, cursosDisponibles,
  handleLogout, handleGoHome, iniciarEdicion, cancelarEdicion, 
  manejarCambios, guardarCambios, agregarTarjeta, eliminarTarjeta
}) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({ numero: '', exp: '', cvc: '', nombre: '' });

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cvc' || name === 'numero') {
      let v = value.replace(/\D/g, ''); 
      if (name === 'numero') {
        v = v.substring(0, 16);
        const match = v.match(/.{1,4}/g);
        v = match ? match.join(' ') : v;
      }
      setNewCard(prev => ({ ...prev, [name]: v }));
      return;
    }
    if (name === 'exp') {
      let v = value.replace(/\D/g, '');
      if (v.length >= 2) {
        v = v.substring(0, 2) + '/' + v.substring(2, 4);
      }
      setNewCard(prev => ({ ...prev, [name]: v }));
      return;
    }
    setNewCard(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if(newCard.numero.length < 19) return alert('Por favor completa el número de tarjeta.');
    if(!newCard.exp || !newCard.cvc || !newCard.nombre) return alert('Por favor completa todos los campos.');
    agregarTarjeta(newCard);
    setIsAddingCard(false);
    setNewCard({ numero: '', exp: '', cvc: '', nombre: '' });
  };

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
          <div className="client-header-actions">
            {/* Nuevo botón 'Home' agregado para facilitar el acceso a la página principal desde el perfil */}
            <button 
              onClick={handleGoHome} 
              className="client-home-btn">
              Home
            </button>
            <button 
              onClick={handleLogout} 
              className="client-logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Tarjetas de Estadísticas */}
        <div className="stats-grid">
          <div className="glass-card">
            <h3 className="card-title">Estado de Cuenta</h3>
            {/* 
              PROCESO DE CAMBIO: 
              Anteriormente este valor estaba estático como 'Activa'. 
              Se ha modificado para que el estado sea dinámico:
              - 'Activo' si el usuario tiene un curso en su perfil (completó registro + inscripción).
              - 'Inactivo' si solo se registró pero no ha elegido curso aún.
              - La clase CSS aplicada (client-card-value-active o client-card-value-inactive) 
                cambia el color del texto según la presencia de 'userData.cursoActual'.
            */}
            <p className={`card-value ${userData.cursoActual ? 'client-card-value-active' : 'client-card-value-inactive'}`}>
              {userData.cursoActual ? 'Activo' : 'Inactivo'}
            </p>
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
              <div className="form-grid">
                <div>
                  <label className="client-form-label">Nombre Completo</label>
                  <input type="text" name="nombre" value={editForm.nombre || ''} onChange={manejarCambios} className="client-form-input" required />
                </div>
                <div>
                  <label className="client-form-label">Edad</label>
                  <input type="text" name="edad" value={editForm.edad || ''} onChange={manejarCambios} className="client-form-input" required />
                </div>
                <div>
                  <label className="client-form-label">Documento de Identidad</label>
                  <select name="documento" value={editForm.documento || ''} onChange={manejarCambios} className="client-form-input" required> 
                    <option value="">-- Selecciona --</option>
                    <option value="Cedula de Identidad">Cedula de Identidad</option>
                    <option value="Dimex">Dimex</option>
                  </select>
                </div>
                <div>
                  <label className="client-form-label">Número de Identificación</label>
                  <input type="text" name="numeroIdentificacion" value={editForm.numeroIdentificacion || ''} onChange={manejarCambios} className="client-form-input" required placeholder="_-__-__" />
                </div>
                <div>
                  <label className="client-form-label">Teléfono</label>
                  <input type="text" name="telefono" value={editForm.telefono || ''} onChange={manejarCambios} className="client-form-input" required />
                </div>
                <div>
                  <label className="client-form-label">Correo Electrónico</label>
                  <input type="email" name="email" value={editForm.email || ''} onChange={manejarCambios} className="client-form-input" required />
                </div>
              </div>

              <div className="client-form-buttons">
                <button type="submit" className="client-btn-save">Guardar Cambios</button>
                <button type="button" onClick={cancelarEdicion} className="client-btn-cancel">Cancelar</button>
              </div>
            </form>
          ) : (
            <div className="client-info-display">
              <div className="info-grid">
                <p className="client-info-p"><strong>Nombre Completo:</strong> {userData.nombre}</p>
                <p className="client-info-p"><strong>Edad:</strong> {userData.edad}</p>
                <p className="client-info-p"><strong>Documento de Identidad:</strong> {userData.documento}</p>
                <p className="client-info-p"><strong>Número de Identificación:</strong> {userData.numeroIdentificacion}</p>
                <p className="client-info-p"><strong>Teléfono:</strong> {userData.telefono}</p>
                <p className="client-info-p"><strong>Correo Electrónico:</strong> {userData.email}</p>
              </div>
              <p className="client-course-p">
                <strong>Curso Matriculado:</strong> {userData.cursoActual || "Aún no has elegido un curso."}
              </p>
              <button 
                onClick={iniciarEdicion} 
                className="client-btn-edit">
                Editar Perfil
              </button>
            </div>
          )}
        </div>

        {/* Métodos de Pago */}
        <div className="glass-card client-glass-card-margin" style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="card-title client-card-title-custom">Métodos de Pago</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => {
                  if (userData.tarjetas && userData.tarjetas.length > 0) {
                    if (window.confirm("¿Estás seguro de que quieres eliminar los datos de tu tarjeta?")) {
                      eliminarTarjeta();
                    }
                  } else {
                    alert("No hay datos de tarjeta registrados para eliminar.");
                  }
                }}
                className="client-btn-cancel"
                style={{ padding: '8px 9px', fontSize: '9px', borderRadius: '10px', margin: 0, minHeight: 'auto', height: 'auto', lineHeight: '1' }}
                title="Eliminar datos de tarjeta"
              >
                Eliminar datos de tarjeta
              </button>
              <button 
                onClick={() => {
                  if (userData.tarjetas && userData.tarjetas.length > 0) {
                    return alert('Tienes que eliminar los datos de la tarjeta reciente para continuar');
                  }
                  setIsAddingCard(!isAddingCard);
                }} 
                className="client-btn-edit"
                style={{ padding: '5px 10px', fontSize: '18px', fontWeight: 'bold' }}
                title="Agregar Tarjeta"
              >
                {isAddingCard ? '-' : '+'}
              </button>
            </div>
          </div>
          <hr className="client-hr" />
          
          <div className="client-info-display">
            {userData.tarjetas && userData.tarjetas.length > 0 ? (
              <div className="info-grid" style={{ marginBottom: '20px' }}>
                {userData.tarjetas.map((tarjeta, index) => {
                  const numMasked = tarjeta.numero ? `${tarjeta.numero.slice(0, 4)} **** **** ****` : '****';
                  return (
                    <div key={index} style={{ padding: '10px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }}>
                      <p className="client-info-p" style={{ margin: '0 0 5px' }}><strong>Titular:</strong> {tarjeta.nombre}</p>
                      <p className="client-info-p" style={{ margin: '0 0 5px' }}><strong>Número:</strong> {numMasked}</p>
                      <p className="client-info-p" style={{ margin: '0' }}><strong>Exp:</strong> {tarjeta.exp}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="client-info-p" style={{ marginBottom: '20px' }}>No tienes tarjetas guardadas.</p>
            )}

            {isAddingCard && (
              <form onSubmit={handleAddCardSubmit} className="client-edit-form" style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px' }}>
                <h4 style={{ color: 'white', marginTop: 0 }}>Agregar Nueva Tarjeta</h4>
                <div className="form-grid">
                  <div>
                    <label className="client-form-label">Número de tarjeta</label>
                    <input type="text" name="numero" value={newCard.numero} onChange={handleCardInputChange} className="client-form-input" placeholder="0000 0000 0000 0000" maxLength="19" required />
                  </div>
                  <div>
                    <label className="client-form-label">Titular de la tarjeta</label>
                    <input type="text" name="nombre" value={newCard.nombre} onChange={handleCardInputChange} className="client-form-input" placeholder="Ej. Juan Pérez" required />
                  </div>
                  <div>
                    <label className="client-form-label">Expiración (MM/YY)</label>
                    <input type="text" name="exp" value={newCard.exp} onChange={handleCardInputChange} className="client-form-input" placeholder="MM/YY" maxLength="5" required />
                  </div>
                  <div>
                    <label className="client-form-label">CVC</label>
                    <input type="password" name="cvc" value={newCard.cvc} onChange={handleCardInputChange} className="client-form-input" placeholder="123" maxLength="3" required />
                  </div>
                </div>
                <div className="client-form-buttons" style={{ marginTop: '15px' }}>
                  <button type="submit" className="client-btn-save">Guardar Tarjeta</button>
                  <button type="button" onClick={() => setIsAddingCard(false)} className="client-btn-cancel">Cancelar</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientComponent;