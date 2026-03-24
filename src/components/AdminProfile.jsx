import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AdminComponent from './Admin.components';
import { postCursos, getCursos, deleteCursos, getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, putCursos } from '../services/fetch';



const AdminProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cursos');
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]); 
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [estudianteActual, setEstudianteActual] = useState({ id: null, nombre: '', email: '', curso: '', estado: 'Activo' });
  const [nuevoCurso, setNuevoCurso] = useState({ nombre: '', categoria: '' });
  const [editandoCurso, setEditandoCurso] = useState(false);
  const [cursoActual, setCursoActual] = useState({});

////////////////////////////////////////////////////////////////

  useEffect(() => {
    const cargarCursos = async () => {
      const cursosData = await getCursos();
      setCursos(cursosData);
    };
    const cargarEstudiantes = async () => {
      const estudiantesData = await getUsuarios();
      setEstudiantes(estudiantesData.filter(user => user.role === 'cliente'));
    };
    cargarCursos();
    cargarEstudiantes();
  }, []);

  const registrarUsuario = postUsuarios;
  const actualizarUsuario = putUsuarios;
  const eliminarUsuarioAPI = deleteUsuarios;

  const handleLogout = () => navigate('/login'); 

  const abrirNuevoUsuario = () => {
    setEstudianteActual({ id: null, nombre: '', email: '', curso: '', estado: 'Activo' });
    setMostrarFormulario(true);
  };

  const abrirEditarUsuario = (estudiante) => {
    setEstudianteActual(estudiante);
    setMostrarFormulario(true);
  };

  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar a este estudiante?")) {
      await eliminarUsuarioAPI(id);
      setEstudiantes(estudiantes.filter(est => est.id !== id));
    }
  };

  const guardarUsuario = async (e) => {
    e.preventDefault();
    if (estudianteActual.id) {
      const data = await actualizarUsuario(estudianteActual.id, estudianteActual);
      setEstudiantes(estudiantes.map(est => est.id === data.id ? data : est));
    } else {
      const nuevoEst = { ...estudianteActual, role: 'cliente', password: '123' };
      delete nuevoEst.id;
      const data = await registrarUsuario(nuevoEst);
      setEstudiantes([...estudiantes, data]);
    }
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
      estudiantes={estudiantes} cursos={cursos}
      mostrarFormulario={mostrarFormulario} setMostrarFormulario={setMostrarFormulario}
      estudianteActual={estudianteActual} setEstudianteActual={setEstudianteActual}
      nuevoCurso={nuevoCurso} setNuevoCurso={setNuevoCurso}
      handleLogout={handleLogout} abrirNuevoUsuario={abrirNuevoUsuario}
      abrirEditarUsuario={abrirEditarUsuario} eliminarUsuario={eliminarUsuario}
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