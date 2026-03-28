import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    
    const pwd = formData.password.trim();
    
    // Validación de fuerza de contraseña
    const hasKLength = pwd.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasSpecialChar = /[?!&#*]/.test(pwd);

    if (!hasKLength || !hasUpperCase || !hasSpecialChar) {
      alert("La contraseña debe tener:\n• Al menos 8 caracteres\n• Al menos una letra mayúscula\n• Al menos un signo especial (? ! & # *)");
      return; 
    }

    // 1. Limpiamos espacios accidentales para que no haya errores en el Login futuro
    const usuarioLimpio = {
      ...formData,
      email: formData.email.trim(),
      password: pwd
    };

    try {
      // Hacemos la petición POST al json-server
      const peticion = await postUsuarios(usuarioLimpio);
      console.log(peticion);
      
      // 3. Le avisamos al usuario y lo mandamos a que inicie sesión
      alert("¡Cuenta creada con éxito! Por favor, inicia sesión.");
      navigate('/login'); 
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
           <label className="form-label">Edad</label>
            <input type="text" name="edad" className="form-control" value={formData.edad} onChange={handleChange} required placeholder="Ej. 18"/>
          <div className="form-group">

            <label className="form-label">Nacionalidad</label>
            <select name="nacionalidad" className="form-control" value={formData.nacionalidad} onChange={handleChange} required>
              <option value="">-- Selecciona tu nacionalidad --</option>
              <option value="Costarricense">Costarricense</option>
              <option value="Mexicano">Mexicano</option>
              <option value="Guatemalteco">Guatemalteco</option>
              <option value="Hondureño">Hondureño</option>
              <option value="Salvadoreño">Salvadoreño</option>
              <option value="Nicaragüense">Nicaragüense</option>
              <option value="Panameño">Panameño</option>
              <option value="Colombiano">Colombiano</option>
              <option value="Venezolano">Venezolano</option>
              <option value="Ecuatoriano">Ecuatoriano</option>
              <option value="Peruano">Peruano</option>
              <option value="Boliviano">Boliviano</option>
              <option value="Chileno">Chileno</option>
              <option value="Argentino">Argentino</option>
              <option value="Uruguayo">Uruguayo</option>
              <option value="Paraguayo">Paraguayo</option>
              <option value="Brasileño">Brasileño</option>
              <option value="Dominicano">Dominicano</option>
              <option value="Cubano">Cubano</option>
              <option value="Puertorriqueño">Puertorriqueño</option>
              <option value="Haitiano">Haitiano</option>
              <option value="Jamaicano">Jamaicano</option>
              <option value="Español">Español</option>
              <option value="Estadounidense">Estadounidense</option>
              <option value="Canadiense">Canadiense</option>
              <option value="Italiano">Italiano</option>
              <option value="Francés">Francés</option>
              <option value="Alemán">Alemán</option>
              <option value="Chino">Chino</option>
              <option value="Japonés">Japonés</option>
              <option value="Otro">Otro</option>
            </select>

             <label className="form-label">Cedula</label>
            <input type="text" name="cedula" className="form-control" value={formData.cedula} onChange={handleChange} required placeholder="Ej. 123456789"/>
            

             <label className="form-label"> Telefono</label>
            <input type="text" name="telefono" className="form-control" value={formData.telefono} onChange={handleChange} required placeholder="Ej. 8745-3321"/>
            
            <label className="form-label">Correo Electrónico</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required placeholder="rl123@gmail.com"/>
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required placeholder="••••••••"/>
            
            <div className="password-hints">
              <p className="password-hints-title">Requisitos de la contraseña:</p>
              <ul className="password-hints-list">
                <li className={formData.password.length >= 8 ? 'hint-valid' : 'hint-invalid'}>
                  {formData.password.length >= 8 ? '✓' : '✗'} Al menos 8 caracteres
                </li>
                <li className={/[A-Z]/.test(formData.password) ? 'hint-valid' : 'hint-invalid'}>
                  {/[A-Z]/.test(formData.password) ? '✓' : '✗'} Al menos una letra mayúscula
                </li>
                <li className={/[?!&#*]/.test(formData.password) ? 'hint-valid' : 'hint-invalid'}>
                  {/[?!&#*]/.test(formData.password) ? '✓' : '✗'} Al menos un signo especial (? ! & # *)
                </li>
              </ul>
            </div>

          </div>
          
          <button type="submit" className="btn-primary">Registrarse</button>
        </form>
        <div className="register-footer">
          <button type="button" onClick={() => navigate('/login')} className="btn-link">
            ¿Ya tienes cuenta? Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;