import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminComponent from './Admin.components';


const AdminProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cursos');
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]); 
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [estudianteActual, setEstudianteActual] = useState({ id: null, nombre: '', email: '', curso: '', estado: 'Activo' });
  const [nuevoCurso, setNuevoCurso] = useState({ nombre: '', categoria: '' });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setEstudiantes(await obtenerEstudiantesAPI());
      setCursos(await obtenerCursosAPI());
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

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
      const data = await actualizarUsuarioAPI(estudianteActual.id, estudianteActual);
      setEstudiantes(estudiantes.map(est => est.id === data.id ? data : est));
    } else {
      const nuevoEst = { ...estudianteActual, role: 'cliente', password: '123' };
      delete nuevoEst.id;
      const data = await registrarUsuarioAPI(nuevoEst);
      setEstudiantes([...estudiantes, data]);
    }
    setMostrarFormulario(false);
  };

  const guardarCurso = async (e) => {
    e.preventDefault();
    try {
      const cursoGuardado = await crearCursoAPI(nuevoCurso);
      setCursos([...cursos, cursoGuardado]); 
      setNuevoCurso({ nombre: '', categoria: '' }); 
    } catch (error) {
      console.error("Error al guardar curso:", error);
    }
  };

  const eliminarCurso = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este curso?")) {
      await eliminarCursoAPI(id);
      setCursos(cursos.filter(curso => curso.id !== id));
    }
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
    />
  );
};

export default AdminProfile;