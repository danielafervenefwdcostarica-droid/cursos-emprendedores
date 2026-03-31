import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AdminComponent from './Admin.components';
import { postCursos, getCursos, deleteCursos, getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, putCursos, getMensajes, deleteMensajes } from '../services/fetch';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]); 
  const [mensajes, setMensajes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [estudianteActual, setEstudianteActual] = useState({ id: null, nombre: '', email: '', curso: '', estado: 'Activo' });
  const [nuevoCurso, setNuevoCurso] = useState({ nombre: '', categoria: '' });
  const [editandoCurso, setEditandoCurso] = useState(false);
  const [cursoActual, setCursoActual] = useState({});
  const [confirmarPassword, setConfirmarPassword] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      const cursosData = await getCursos();
      setCursos(cursosData);
      
      const estudiantesData = await getUsuarios();
      setEstudiantes(estudiantesData.filter(user => user.role === 'cliente'));
      
      const mensajesData = await getMensajes();
      setMensajes(mensajesData || []);
    };
    cargarDatos();
  }, []);

  const registrarUsuario = postUsuarios;
  const actualizarUsuario = putUsuarios;
  const eliminarUsuarioAPI = deleteUsuarios;

  const handleLogout = () => {
    // Cerramos sesión limpiando el almacenamiento y enviando al usuario al inicio
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('id');
    navigate('/');
  }; 

  const abrirNuevoUsuario = (role) => {
    const assignedRole = typeof role === 'string' ? role : 'cliente';
    setEstudianteActual({ id: null, nombre: '', email: '', curso: '', estado: 'Activo', role: assignedRole, password: '' });
    setConfirmarPassword('');
    setMostrarFormulario(true);
  };

  const abrirEditarUsuario = (usuario) => {
    setEstudianteActual({ ...usuario, password: '' });
    setConfirmarPassword('');
    setMostrarFormulario(true);
  };

  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar a este estudiante?")) {
      await eliminarUsuarioAPI(id);
      setEstudiantes(estudiantes.filter(est => est.id !== id));
    }
  };

  const eliminarMensaje = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este mensaje?")) {
      await deleteMensajes(id);
      setMensajes(mensajes.filter(msg => msg.id !== id));
    }
  };

  const guardarUsuario = async (e) => {
    e.preventDefault();
    if (estudianteActual.id) {
      const data = await actualizarUsuario(estudianteActual.id, estudianteActual);
      setEstudiantes(estudiantes.map(est => est.id === data.id ? data : est));
    } else {
      const roleToUse = estudianteActual.role || 'cliente';
      const userPassword = roleToUse === 'admin' ? estudianteActual.password : '123';
      const nuevoEst = { ...estudianteActual, role: roleToUse, password: userPassword };
      delete nuevoEst.id;
      const data = await registrarUsuario(nuevoEst);
      setEstudiantes([...estudiantes, data]);
    }
    setConfirmarPassword('');
    setMostrarFormulario(false);
  };

  const guardarCurso = async (e) => {
    e.preventDefault();
    try {
      const cursoGuardado = await postCursos(nuevoCurso);
      setCursos([...cursos, cursoGuardado]); 
      setNuevoCurso({ nombre: '', categoria: '' }); 
    } catch (error) {
      console.error("Error al guardar curso:", error);
    }
  };

  const eliminarCurso = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este curso?")) {
      await deleteCursos(id);
      setCursos(cursos.filter(curso => curso.id !== id));
    }
  };

  const abrirEditarCurso = (curso) => {
    setCursoActual(curso);
    setEditandoCurso(true);
  };

  const manejarCambioCurso = (e) => {
    const { name, value } = e.target;
    setCursoActual({ ...cursoActual, [name]: value });
  };

  const guardarCambiosCurso = async () => {
    await putCursos(cursoActual, cursoActual.id);
    setCursos(cursos.map(c => c.id === cursoActual.id ? cursoActual : c));
    setEditandoCurso(false);
  };

  // --- AQUÍ CONECTAMOS LA LÓGICA CON LA VISTA ---
  return (
    <AdminComponent 
      activeTab={activeTab} setActiveTab={setActiveTab}
      estudiantes={estudiantes} cursos={cursos} mensajes={mensajes}
      mostrarFormulario={mostrarFormulario} setMostrarFormulario={setMostrarFormulario}
      estudianteActual={estudianteActual} setEstudianteActual={setEstudianteActual}
      nuevoCurso={nuevoCurso} setNuevoCurso={setNuevoCurso}
      handleLogout={handleLogout} abrirNuevoUsuario={abrirNuevoUsuario}
      eliminarUsuario={eliminarUsuario} eliminarMensaje={eliminarMensaje}
      guardarUsuario={guardarUsuario} guardarCurso={guardarCurso}
      eliminarCurso={eliminarCurso}
      onCursoCreated={(curso) => setCursos([...cursos, curso])}
      editando={editandoCurso} setEditando={setEditandoCurso}
      editar={abrirEditarCurso} manejarCambio={manejarCambioCurso}
      guardarCambios={guardarCambiosCurso} CursoActual={cursoActual}
    />
  );
};

export default AdminProfile;