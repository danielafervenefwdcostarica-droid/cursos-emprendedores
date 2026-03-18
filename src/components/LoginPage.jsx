import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesionAPI } from '../services/fetch'; // <-- Importamos el servicio
import '../styles/RegisterPage.css'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailLimpio = formData.email.trim();
    const passwordLimpia = formData.password.trim();

    try {
      // Usamos el servicio limpio
      const usuariosEncontrados = await iniciarSesionAPI(emailLimpio, passwordLimpia);

      if (usuariosEncontrados.length > 0) {
        const usuarioValido = usuariosEncontrados[0];
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioValido));

        if (usuarioValido.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/cliente');
        }
      } else {
        alert("Usuario o contraseña incorrectos. Por favor, verifica tus datos.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error de conexión. Revisa el servidor.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">Iniciar Sesión</h2>
          <p className="register-subtitle">Ingresa tus credenciales para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required placeholder="correo@empresa.com"/>
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required placeholder="••••••••"/>
          </div>
          <button type="submit" className="btn-primary">Entrar</button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button onClick={() => navigate('/registro')} style={{ background: 'none', border: 'none', color: '#004aad', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}>
            ¿No tienes cuenta? Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;