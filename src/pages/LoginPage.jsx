import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css'; // Mantenemos tu diseño impecable

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Aquí está la función conectada a la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Verificando credenciales en la base de datos...");

    try {
      // Llamamos al json-server
      const respuesta = await fetch(`http://localhost:3001/usuarios?email=${formData.email}&password=${formData.password}`);
      const usuariosEncontrados = await respuesta.json();

      if (usuariosEncontrados.length > 0) {
        const usuarioValido = usuariosEncontrados[0];
        console.log("¡Login exitoso!", usuarioValido);

        // Redirigimos según el rol que venga de la base de datos
        if (usuarioValido.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/cliente');
        }
      } else {
        alert("Correo o contraseña incorrectos. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error conectando a la base de datos:", error);
      alert("Asegúrate de tener encendido el json-server en el puerto 3001.");
    }
  };

  // Toda la parte visual (UI) que se te había borrado
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

          <button type="submit" className="btn-primary">
            Entrar
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            onClick={() => navigate('/registro')}
            style={{ background: 'none', border: 'none', color: '#004aad', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}
          >
            ¿No tienes cuenta? Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;