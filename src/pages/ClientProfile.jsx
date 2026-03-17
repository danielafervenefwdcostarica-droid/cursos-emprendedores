import React from 'react';
import '../styles/Dashboard.css';

const ClientProfile = () => {
  // Datos simulados (luego vendrán de tu base de datos)
  const userData = {
    nombre: "Aaron Lorenzo",
    email: "aaronqlv@gmail.com",
    plan: "Premium",
    fechaRegistro: "Octubre 2023"
  };

  return (
    <div className="dashboard-layout">
      <div className="main-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div className="profile-header">
          <div className="avatar">AL</div>
          <div>
            <h1 className="page-title">Bienvenido, {userData.nombre}</h1>
            <p className="page-subtitle">Gestiona tu cuenta y servicios desde aquí.</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="glass-card">
            <h3 className="card-title">Estado de Cuenta</h3>
            <p className="card-value" style={{ color: '#28a745' }}>Activa</p>
          </div>
          <div className="glass-card">
            <h3 className="card-title">Plan Actual</h3>
            <p className="card-value">{userData.plan}</p>
          </div>
          <div className="glass-card">
            <h3 className="card-title">Próximo Pago</h3>
            <p className="card-value" style={{ fontSize: '24px', marginTop: '8px' }}>15 Nov, 2023</p>
          </div>
        </div>

        <div className="glass-card" style={{ marginTop: '20px' }}>
          <h3 className="card-title" style={{ color: '#1a1a1a', fontSize: '18px' }}>Información Personal</h3>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '15px 0' }} />
          <p><strong>Nombre Completo:</strong> {userData.nombre}</p>
          <p><strong>Correo Electrónico:</strong> {userData.email}</p>
          <p><strong>Miembro desde:</strong> {userData.fechaRegistro}</p>
          <button style={{ 
            marginTop: '20px', padding: '10px 20px', backgroundColor: '#004aad', 
            color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' 
          }}>
            Editar Perfil
          </button>
        </div>

      </div>
    </div>
  );
};

export default ClientProfile;