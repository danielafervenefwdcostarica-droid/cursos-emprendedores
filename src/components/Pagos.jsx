import React, { useState } from 'react';
import '../styles/pagos.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { putUsuarios } from '../services/fetch';



const Pagos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cursoSeleccionado = location.state?.cursoSeleccionado || "";

  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);
  const [estadoPago, setEstadoPago] = useState(null); // null, 'procesando', 'exito', 'error'
  const [formData, setFormData] = useState({ numero: '', exp: '/', cvc: '', nombre: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validación específica para el CVC y el Número de tarjeta para que solo acepten números
    // Además, para el número de tarjeta se agrega un espacio cada 4 dígitos (XXXX XXXX XXXX XXXX)
    if (name === 'cvc' || name === 'numero') {
      let v = value.replace(/\D/g, ''); // Eliminamos cualquier carácter que no sea número
      
      if (name === 'numero') {
        v = v.substring(0, 16); // Límite de 16 números
        const match = v.match(/.{1,4}/g);
        v = match ? match.join(' ') : v;
      }
      
      setFormData(prev => ({ ...prev, [name]: v }));
      return;
    }

    // Formateo automático para la fecha de expiración (MM/YY)
    if (name === 'exp') {
      let v = value.replace(/\D/g, ''); // Solo números
      if (v.length >= 2) {
        // Ponemos el '/' automáticamente después del mes
        v = v.substring(0, 2) + '/' + v.substring(2, 4);
      }
      setFormData(prev => ({ ...prev, [name]: v }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePago = async () => {
    if (!metodoSeleccionado) return alert("Por favor selecciona un método de pago");
    
    setEstadoPago('procesando');
    
    // Simulación de delay de red (2 segundos)
    setTimeout(async () => {
      // Regla simple: Si termina en 00, falla. Si no, éxito.
      if (formData.numero.endsWith('00')) {
        setEstadoPago('error');
      } else {
        // ACTUALIZACIÓN DE CURSO EXITOSA
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioLogueado'));
        if (usuarioActual && cursoSeleccionado) {
          const tarjetasAnteriores = usuarioActual.tarjetas || [];
          const nuevaTarjeta = {
            numero: formData.numero,
            exp: formData.exp,
            cvc: formData.cvc,
            nombre: formData.nombre
          };
          
          const usuarioActualizado = { 
            ...usuarioActual, 
            curso: cursoSeleccionado,
            tarjetas: [...tarjetasAnteriores, nuevaTarjeta]
          };
          
          try {
            // Guardamos en la base de datos
            await putUsuarios(usuarioActual.id, usuarioActualizado);
            // Actualizamos localStorage para sincronizar con el perfil
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActualizado));
            // Actualizamos localStorage para el perfil
            // PROCESO DE CAMBIO: 
            // Se ha reemplazado la alerta nativa del navegador (alert) por un cuadro de confirmación personalizado 
            // en la interfaz de usuario (success-message-box) para una experiencia más profesional y estética.
            // alert(`gracias por inscribirte a nuestro curso de ${cursoSeleccionado} en estos dias te estaremos enviando un correo con informacion sobre tu curso de interés; para dudas o consultas te invitamos a pasar por nuestro apartado de contectos.`);
          } catch (error) {
            console.error("Error al actualizar curso:", error);
          }
        }
        
        setEstadoPago('exito');
      }
    }, 2000);
  };

  const renderFormulario = () => {
    if (!metodoSeleccionado || estadoPago) return null;

    return (
      <div className="payment-form">
          <div className="form-group">
            <label>Número de tarjeta</label>
            <input 
              type="text" 
              name="numero"
              className="input-field" 
              placeholder="0000 0000 0000 0000"
              maxLength="19" // 16 números + 3 espacios tal como se solicitó
              value={formData.numero}
              onChange={handleInputChange} 
            />
          </div>
        <div className="form-row">
          <div className="form-group">
            <label>Expiración</label>
            <input 
              type="text" 
              name="exp"
              className="input-field" 
              placeholder="MM / YY"
              maxLength="5" // Limitamos a MM/YY (5 caracteres) tal como se solicitó
              value={formData.exp}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>CVC</label>
            <input 
              type="password" 
              name="cvc"
              className="input-field" 
              placeholder="123"
              maxLength="3" // Limitamos a 3 caracteres máximo tal como se solicitó
              value={formData.cvc}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Nombre del titular</label>
          <input 
            type="text" 
            name="nombre"
            className="input-field" 
            placeholder="Ej. Juan Pérez"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
  };

  const renderEstadoPago = () => {
    if (estadoPago === 'procesando') {
      return (
        <div className="payment-status-container">
          <div className="spinner"></div>
          <p>Procesando tu pago...</p>
        </div>
      );
    }

    if (estadoPago === 'exito') {
      return (
        <div className="payment-status-container success">
          <div className="status-icon">✓</div>
          <h3>¡Inscripción Completada!</h3>
          {/* Cuadro de confirmación con el mensaje personalizado solicitado */}
          <div className="success-message-box">
            <p>
              Gracias por inscribirte a nuestro curso de <strong>{cursoSeleccionado}</strong>. 
              En estos días te estaremos enviando un correo con información sobre tu curso de interés; 
              para dudas o consultas te invitamos a pasar por nuestro apartado de contactos.
            </p>
          </div>
          <button className="btn-volver" onClick={() => navigate('/')}>Volver al Inicio</button>
        </div>
      );
    }

    if (estadoPago === 'error') {
      return (
        <div className="payment-status-container error">
          <div className="status-icon">✕</div>
          <h3>Pago Rechazado</h3>
          <p>Hubo un problema con tu tarjeta. Inténtalo de nuevo.</p>
          <button className="btn-volver" onClick={() => setEstadoPago(null)}>Reintentar</button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="pagos-container">
      <div className="pagos-card">
        {/* Header with lock icon */}
        <div className="pagos-header">
          <svg
            className="lock-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Tu negocio
        </div>

        {/* Subscription Badge */}
        <div className="badge-inscripción">
          Suscripción
        </div>

        {/* Pricing Info */}
        <div className="pagos-info">
          <h2>Paga ₡10.000/mes</h2>
          <p className="pagos-description">
            Se cobrará el día 20 de cada mes 
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="payment-grid">
          {['sepa', 'visa', 'mastercard', 'paypal', 'apple', 'google', 'link'].map((method) => {
            const isActive = metodoSeleccionado === method;
            return (
              <div
                key={method}
                className={`payment-method ${isActive ? 'active' : ''}`}
                onClick={() => setMetodoSeleccionado(method)}
              >
                {method === 'sepa' && <span className="method-logo sepa">S€PA</span>}
                {method === 'visa' && <span className="method-logo visa">VISA</span>}
                {method === 'mastercard' && (
                  <div className="method-logo mastercard">
                    <svg width="40" height="24" viewBox="0 0 40 24">
                      <circle cx="12" cy="12" r="10" fill="#eb001b" fillOpacity="0.8" />
                      <circle cx="28" cy="12" r="10" fill="#f79e1b" fillOpacity="0.8" />
                    </svg>
                  </div>
                )}
                {/* Se añade PayPal como nuevo método de pago solicitado por el usuario */}
                {method === 'paypal' && <span className="method-logo paypal">PayPal</span>}
                {method === 'apple' && (
                  <div className="method-logo apple-pay">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.96.78-2.1 1.24-3.3 1.24-3.41 0-5.74-2.5-5.74-6.32 0-3.37 1.86-5.87 4.54-5.87 1.3 0 2.26.54 3.01 1.18V8.16c0-1.3-.85-2.27-2.14-2.27-.85 0-1.57.4-1.95.8l-1.4-1.3c.78-.96 2.05-1.74 3.76-1.74 2.8 0 4.67 1.77 4.67 4.51v9.54c0 1.3.85 2.27 2.14 2.27.35 0 .66-.08.9-.22l.5 1.5c-.5.4-1.2.6-2 .6-1.7 0-3-1.07-3-2.77z"></path>
                    </svg>
                    <span>Pay</span>
                  </div>
                )}
                {method === 'google' && (
                  <div className="method-logo google-pay">
                    <span style={{ color: '#4285F4' }}>G</span>
                    <span>Pay</span>
                  </div> 
                )}
               
              </div>
            );
          })}
        </div>

        {/* Dynamic Details Area */}
        {renderEstadoPago() || renderFormulario()}

        {/* CTA Button */}
        {!estadoPago && (
          <button className="btn-comprar" onClick={handlePago}>
            Comprar ₡10.000
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagos;