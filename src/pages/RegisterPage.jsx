// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import '../styles/RegisterPage.css'; // Importamos los estilos separados

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    role: 'cliente' // Por defecto
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos listos para enviar al backend:", formData);
    // Aquí conectarás con la API de tus compañeros
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">Crear Cuenta</h2>
          <p className="register-subtitle">Complete el formulario para acceder al sistema</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          
          <div className="form-group">
            <label className="form-label">Nombre Completo</label>
            <input 
              type="text" 
              name="nombre" 
              className="form-control"
              value={formData.nombre} 
              onChange={handleChange} 
              required 
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              name="email" 
              className="form-control"
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="correo@empresa.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              name="password" 
              className="form-control"
              value={formData.password} 
              onChange={handleChange} 
              required 
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tipo de Cuenta</label>
            <select 
              name="role" 
              className="form-control"
              value={formData.role} 
              onChange={handleChange}
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;