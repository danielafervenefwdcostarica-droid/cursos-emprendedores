import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsuarios } from '../services/fetch';
import '../styles/RegisterPage.css'; 



const LoginPage = () => {
  const navigate = useNavigate();
    const [usuarios,setUsuarios] = useState([])
    const [emailUsuario,setEmailUsuario] = useState("")
    const [claveUsuario,setClaveUsuario] = useState("")
  useEffect(()=>{
    async function traerUsuarios() {
      const lista = await getUsuarios()
      setUsuarios(lista)
    }
    traerUsuarios()
  },[])

  const iniciarSesion = () => {
    const usuarioValido = usuarios.find((u)=> u.email === emailUsuario && u.password === claveUsuario)
    if (usuarioValido) {
      alert("Inicio de sesión exitoso")
      
      // GUARDAMOS EL USUARIO EN LOCALSTORAGE PARA QUE EL PERFIL LO ENCUENTRE
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioValido));
      localStorage.setItem("id",usuarioValido.id)
      // Se cambió la navegación para que, tras un login exitoso, el usuario vaya a la página principal ('/')
      // en lugar de enviarlo a su perfil. Esto permite una mejor experiencia al ver directamente los cursos.
      navigate('/');
    }else{
      alert(" contraseña o email incorrecto")
    }
  }


  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">Iniciar Sesión</h2>
          <p className="register-subtitle">Ingresa tus credenciales para continuar</p>
        </div>
        <form className="register-form" autoComplete="off">
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input type="email" name="email" className="form-control" value={emailUsuario} onChange={(e)=>setEmailUsuario(e.target.value)} required placeholder="rl123@gmail.com" autoComplete="off"/>
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input type="password" name="password" className="form-control" value={claveUsuario} onChange={(e)=>setClaveUsuario(e.target.value)} required placeholder="••••••••" autoComplete="new-password"/>
          </div>
          <button type="button" onClick={iniciarSesion} className="btn-primary">Entrar</button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button onClick={() => navigate('/Registro')} style={{ background: 'none', border: 'none', color: '#004aad', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}>
            ¿No tienes cuenta? Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;