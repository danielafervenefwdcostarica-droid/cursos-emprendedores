import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsuarios } from '../services/fetch';
import '../styles/RegisterPage.css'; 



const LoginPage = () => {
  const navigate = useNavigate();
  
  useEffect(()=>{
    async function traerUsuarios() {
      const lista = await getUsuarios()
      setUsuarios(lista)
    }
    traerUsuarios
  },[])

  const iniciarSesion = () => {
    const usuarioValido = usuarios.find((u)=> u.email == emailUsuario && u.password == claveUsuario)
    if (usuarioValido) {
      alert("inicia")
    }else{
      alert("no inicia")
    }
  }


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
            <input type="email" name="email" className="form-control" value={emailUsuario} onChange={(e)=>setEmailUsuario(e.target.value)} required placeholder="correo@empresa.com"/>
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input type="password" name="password" className="form-control" value={claveUsuario} onChange={(e)=>setClaveUsuario(e.target.value)} required placeholder="••••••••"/>
          </div>
          <button type="button" onClick={iniciarSesion} className="btn-primary">Entrar</button>
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