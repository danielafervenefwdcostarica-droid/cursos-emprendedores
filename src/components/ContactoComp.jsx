import React, { useState } from 'react';
import '../styles/Contacto.css';

const ContactoComp = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: 'Dudas sobre inscripciones',
        mensaje: '',
        privacidad: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // VALIDACIÓN: Verificar que no haya campos vacíos
        if (!formData.nombre || !formData.email || !formData.mensaje) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (!formData.privacidad) {
            alert("Debes aceptar la política de privacidad para enviar el mensaje.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/mensajes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.");
                setFormData({
                    nombre: '',
                    email: '',
                    asunto: 'Dudas sobre inscripciones',
                    mensaje: '',
                    privacidad: false
                });
            } else {
                alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error de conexión. Asegúrate de que el servidor esté corriendo.");
        }
    };

    return (
        <div className="contacto-wrapper">
            <header className="contacto-header">
                <span className="contacto-tag">CONTACTO ACADÉMICO</span>
                <h1 className="contacto-title">Estamos aquí para impulsarte.</h1>
                <p className="contacto-subtitle">
                    ¿Tienes dudas sobre nuestros programas o necesitas asistencia técnica?<br />
                    Nuestro equipo académico está listo para responderte en menos de 24 horas.
                </p>
            </header>

            <div className="contacto-grid">
                {/* Columna Izquierda */}
                <aside className="contacto-info-column">
                    <div className="info-card">
                        <h2 className="info-card-title">Información Directa</h2>
                        
                        <div className="info-item">
                            <div className="info-icon-container">
                                <span className="info-icon">✉️</span>
                            </div>
                            <div className="info-text">
                                <span className="info-label">Correo Electrónico</span>
                                <span className="info-value">cursosplus@gmail</span>
                                <span className="info-extra">Soporte técnico y dudas académicas</span>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon-container">
                                <span className="info-icon">📍</span>
                            </div>
                            <div className="info-text">
                                <span className="info-label">Sede Central</span>
                                <span className="info-value">Av. Innovación 450, Distrito Tecnológico</span>
                                <span className="info-extra">Atención presencial bajo cita previa</span>
                            </div>
                        </div>

                        <div className="social-links">
                            <span className="social-label">SÍGUENOS EN REDES</span>
                            <div className="social-icons">
                                <button className="social-btn"><span className="social-icon">🔗</span></button>
                                <button className="social-btn"><span className="social-icon">🌐</span></button>
                                <button className="social-btn"><span className="social-icon">💬</span></button>
                            </div>
                        </div>
                    </div>

                    <div className="faq-card">
                        <h2 className="faq-title">Preguntas Frecuentes</h2>
                        
                        <div className="faq-list">
                            <div className="faq-item">
                                <h3 className="faq-question">¿Cómo registrarse?</h3>
                                <p className="faq-answer">Haz clic en 'Login' y elige 'Crear Cuenta'. Solo necesitas un correo válido.</p>
                            </div>
                            
                            <div className="faq-item">
                                <h3 className="faq-question">¿Hay cursos para adultos mayores?</h3>
                                <p className="faq-answer">Sí, tenemos una sección dedicada 'Plataforma Senior' con interfaces simplificadas.</p>
                            </div>
                        </div>

                        <a href="#" className="see-all-faqs">Ver todas las preguntas <span className="faq-arrow">→</span></a>
                    </div>
                </aside>

                {/* Columna Derecha: Formulario */}
                <main className="contacto-form-column">
                    <form className="contacto-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Nombre Completo</label>
                                <input 
                                    name="nombre"
                                    type="text" 
                                    className="form-input" 
                                    placeholder="Ej. Alex González" 
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Correo Electrónico</label>
                                <input 
                                    name="email"
                                    type="email" 
                                    className="form-input" 
                                    placeholder="alex@ejemplo.com" 
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Asunto de tu Consulta</label>
                            <div className="select-wrapper">
                                <select 
                                    name="asunto"
                                    className="form-select"
                                    value={formData.asunto}
                                    onChange={handleChange}
                                >
                                    <option>Dudas sobre inscripciones</option>
                                    <option>Soporte Técnico</option>
                                    <option>Becas y Financiamiento</option>
                                    <option>Otros</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Tu Mensaje</label>
                            <textarea 
                                name="mensaje"
                                className="form-textarea" 
                                placeholder="Cuéntanos cómo podemos ayudarte..."
                                value={formData.mensaje}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="form-checkbox-group">
                            <input 
                                name="privacidad"
                                type="checkbox" 
                                id="privacy" 
                                className="form-checkbox" 
                                checked={formData.privacidad}
                                onChange={handleChange}
                            />
                            <label htmlFor="privacy" className="checkbox-label">
                                Acepto la <a href="#">Política de Privacidad</a> y el tratamiento de mis datos.
                            </label>
                        </div>

                        <button type="submit" className="submit-btn">
                            Enviar Mensaje <span className="plane-icon">✈️</span>
                        </button>
                    </form>
                </main>
            </div>
            
            {/* Sección inferior: Visítanos */}
            <div className="visit-us-bar">
                <div className="visit-card">
                    <span className="visit-label">VISÍTANOS</span>
                    <p className="visit-text">Nuestras oficinas están abiertas de Lunes a Viernes de 9:00 a 18:00h.</p>
                </div>
            </div>
        </div>
    );
};

export default ContactoComp;
