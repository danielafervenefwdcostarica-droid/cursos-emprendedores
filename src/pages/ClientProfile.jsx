// src/pages/ClientProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerCursosAPI, actualizarUsuarioAPI } from '../services/fetch';
import ClientComponent from '../components/Client.component.jsx'; // <-- Importamos nuestra vista

const ClientProfile = () => {
  const navigate = useNavigate();

  // Estados
  const [userData, setUserData] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      const parsedUser = JSON.parse(usuarioGuardado);
      return { ...parsedUser, plan: "Premium", fechaRegistro: "2023", cursoActual: parsedUser.curso || "" };
    }
    return { nombre: "Estudiante", email: "", plan: "Básico", fechaRegistro: "", cursoActual: "" };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userData);
  const [cursosDisponibles, setCursosDisponibles] = useState([]);

  // Cargar cursos al montar el componente
  useEffect(() => {
    const cargarCursos = async () => {
      try {
        const datos = await obtenerCursosAPI();
        setCursosDisponibles(datos);
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
      }
    };
    cargarCursos();
  }, []);

  // Funciones de manejo
  const handleLogout = () => {
    localStorage.removeItem('usuarioLogueado');
    navigate('/login');
  };

  const iniciarEdicion = () => {
    setEditForm(userData);
    setIsEditing(true);
  };

  const cancelarEdicion = () => setIsEditing(false);

  const manejarCambios = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      const datosParaBD = { ...editForm, curso: editForm.cursoActual };
      
      if (userData.id) {
        await actualizarUsuarioAPI(userData.id, datosParaBD);
      }

      setUserData(editForm);
      localStorage.setItem('usuarioLogueado', JSON.stringify(datosParaBD));
      setIsEditing(false);
      alert(`¡Genial! Datos actualizados correctamente.`);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // Renderizamos el Componente visual y le pasamos los datos y funciones
  return (
    <ClientComponent 
      userData={userData}
      isEditing={isEditing}
      editForm={editForm}
      cursosDisponibles={cursosDisponibles}
      handleLogout={handleLogout}
      iniciarEdicion={iniciarEdicion}
      cancelarEdicion={cancelarEdicion}
      manejarCambios={manejarCambios}
      guardarCambios={guardarCambios}
    />
  );
};

export default ClientProfile;