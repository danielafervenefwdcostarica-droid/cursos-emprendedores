// src/pages/ClientProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientComponent from '../components/Client.component.jsx'; // <-- Importamos nuestra vista
import { getCursos, putUsuarios } from '../services/fetch';

const ClientProfile = () => {
  const navigate = useNavigate();

  // Estados
  const [userData, setUserData] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      const parsedUser = JSON.parse(usuarioGuardado);
      return { 
        ...parsedUser, 
        plan: "Premium",  
        cursoActual: parsedUser.curso || "",
        edad: parsedUser.edad || "",
        documento: parsedUser.documento || "",
        numeroIdentificacion: parsedUser.numeroIdentificacion || "",
        telefono: parsedUser.telefono || ""
      };
    }
    return { 
      nombre: "", 
      email: "", 
      plan: "Básico", 
      cursoActual: "",
      edad: "",
      documento: "",
      numeroIdentificacion: "",
      telefono: ""
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userData);
  const [cursosDisponibles, setCursosDisponibles] = useState([]);

  // Cargar cursos al montar el componente
  useEffect(() => {
    const cargarCursos = async () => {
      try {
        const datos = await getCursos();
        setCursosDisponibles(datos);
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
      }
    };
    cargarCursos();
  }, []);

  // Funciones de manejo
  const handleLogout = () => {
    // Limpiamos los datos del usuario del almacenamiento local para cerrar la sesión
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('id');
    // Redirigimos a la página principal fuera de la cuenta
    navigate('/');
  };

  // Función para regresar a la página de inicio directamente desde el perfil del cliente
  const handleGoHome = () => navigate('/');

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
        await putUsuarios(userData.id, datosParaBD);
      }

      setUserData(editForm);
      localStorage.setItem('usuarioLogueado', JSON.stringify(datosParaBD));
      setIsEditing(false);
      alert(`¡Genial! Datos actualizados correctamente.`);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const agregarTarjeta = async (nuevaTarjeta) => {
    try {
      const tarjetasActualizadas = [...(userData.tarjetas || []), nuevaTarjeta];
      const datosActualizados = { ...userData, tarjetas: tarjetasActualizadas };
      
      if (userData.id) {
        await putUsuarios(userData.id, datosActualizados);
      }
      
      setUserData(datosActualizados);
      localStorage.setItem('usuarioLogueado', JSON.stringify(datosActualizados));
      alert('Tarjeta agregada exitosamente.');
    } catch (error) {
      console.error("Error al agregar tarjeta:", error);
    }
  };

  const eliminarTarjeta = async () => {
    try {
      const datosActualizados = { ...userData, tarjetas: [] };
      
      if (userData.id) {
        await putUsuarios(userData.id, datosActualizados);
      }
      
      setUserData(datosActualizados);
      localStorage.setItem('usuarioLogueado', JSON.stringify(datosActualizados));
      alert('Datos de tarjeta eliminados exitosamente.');
    } catch (error) {
      console.error("Error al eliminar tarjeta:", error);
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
      handleGoHome={handleGoHome}
      iniciarEdicion={iniciarEdicion}
      cancelarEdicion={cancelarEdicion}
      manejarCambios={manejarCambios}
      guardarCambios={guardarCambios}
      agregarTarjeta={agregarTarjeta}
      eliminarTarjeta={eliminarTarjeta}
    />
  );
};

export default ClientProfile;