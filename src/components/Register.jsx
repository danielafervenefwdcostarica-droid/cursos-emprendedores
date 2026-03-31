import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css'; 
import { postUsuarios } from '../services/fetch';

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '', 
    email: '', 
    password: '', 
    role: 'cliente',
    edad: '',
    nacionalidad: '',
    cedula: '',
    telefono: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert("acepta Términos y condiciones para continuar");
      return;
    }
    
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

          
             <label className="form-label">Documento de Identidad</label>
               <select name="documento" className="form-control" value={formData.documento} onChange={handleChange} required> 
              <option value="">-- Selecciona tu documento --</option>
              <option value="Cedula de Identidad ">Cedula de Identidad</option>
              <option value="Dimex">Dimex</option>
        
             </select>
           <label className="form-label">Número de Identificación</label>
            <input type="text" name="numeroIdentificacion" className="form-control" value={formData.numeroIdentificacion} onChange={handleChange} required placeholder="_-__-__"/>
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

          <div className="terms-container">
            <h4 className="terms-title">Términos y Condiciones</h4>
            <div className="terms-box">
              <p>Al completar el proceso de registro en esta plataforma de cursos virtuales, el usuario declara que la información proporcionada es veraz, completa y actualizada. El registro es personal e intransferible, por lo que cada usuario es responsable de mantener la confidencialidad de su nombre de usuario y contraseña.</p>
              <p>El usuario se compromete a no crear cuentas falsas, suplantar la identidad de otras personas o utilizar datos que no le pertenezcan. En caso de detectarse información incorrecta, fraudulenta o incompleta, la plataforma se reserva el derecho de suspender o eliminar la cuenta sin previo aviso.</p>
              <p>El acceso a la plataforma está destinado exclusivamente a fines educativos. Por lo tanto, el usuario acepta utilizar su cuenta únicamente para participar en los cursos, actividades y servicios ofrecidos, respetando en todo momento las normas de convivencia y el uso adecuado de los recursos digitales.</p>
              <p>Asimismo, el usuario reconoce que no está permitido compartir su cuenta con terceros. Cualquier uso indebido, incluyendo el acceso simultáneo desde múltiples dispositivos de manera sospechosa o la distribución de credenciales, podrá dar lugar a la cancelación del acceso.</p>
              <p>La plataforma podrá enviar notificaciones relacionadas con el proceso de aprendizaje, actualizaciones de cursos, recordatorios y comunicaciones importantes al correo electrónico registrado. Es responsabilidad del usuario asegurarse de que su información de contacto sea correcta y esté activa.</p>
              <p>En cuanto a la protección de datos, la información personal proporcionada durante el registro será tratada de manera confidencial y utilizada únicamente para fines académicos, administrativos y de mejora del servicio, conforme a la normativa vigente en materia de protección de datos.</p>
              <p>La plataforma se reserva el derecho de modificar estos términos en cualquier momento. El uso continuo del sistema después de dichos cambios implicará la aceptación de los mismos.</p>
              <p>Al registrarse, el usuario confirma que ha leído, comprendido y aceptado estos términos y condiciones.</p>
            </div>
            <div className="terms-checkbox-group">
              <input 
                type="checkbox" 
                id="terms" 
                checked={acceptedTerms} 
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <label htmlFor="terms">Acepto los términos y condiciones</label>
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