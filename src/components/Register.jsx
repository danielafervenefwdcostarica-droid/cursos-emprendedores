import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarUsuarioAPI } from '../services/fetch'; 
import '../styles/RegisterPage.css'; 
import { postUsuarios } from '../services/fetch';

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '', email: '', password: '', role: 'cliente'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Limpiamos espacios accidentales para que no haya errores en el Login futuro
    const usuarioLimpio = {
      ...formData,
      email: formData.email.trim(),
      password: formData.password.trim()
    };

    try {
      // Hacemos la petición POST al json-server
     const peticion = await postUsuarios(formData)
      console.log(peticion);
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Asegúrate de tener encendido el servidor.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">Crear Cuenta</h2>
          <p className="register-subtitle">Complete el formulario para acceder a la academia</p>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label className="form-label">Nombre Completo</label>
            <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required placeholder="Ej. Juan Pérez"/>
          </div>
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required placeholder="correo@empresa.com"/>
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required placeholder="••••••••"/>
          </div>
          <div className="form-group">
            <label className="form-label">Tipo de Cuenta</label>
            <select name="role" className="form-control" value={formData.role} onChange={handleChange}>
              <option value="cliente">Estudiante</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Registrarse</button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button type="button" onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#004aad', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}>
            ¿Ya tienes cuenta? Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;