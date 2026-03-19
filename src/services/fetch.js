// src/services/fetch.js
const BASE_URL = 'http://localhost:3001';

// --- USUARIOS Y AUTENTICACIÓN ---

export const iniciarSesionAPI = async (email, password) => {
  const respuesta = await fetch(`${BASE_URL}/usuarios?email=${email}&password=${password}`);
  return await respuesta.json();
};

export const registrarUsuarioAPI = async (usuario) => {
  const respuesta = await fetch(`${BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });
  return await respuesta.json();
};

export const obtenerEstudiantesAPI = async () => {
  const respuesta = await fetch(`${BASE_URL}/usuarios?role=cliente`);
  return await respuesta.json();
};

export const actualizarUsuarioAPI = async (id, datos) => {
  const respuesta = await fetch(`${BASE_URL}/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  return await respuesta.json();
};

export const eliminarUsuarioAPI = async (id) => {
  await fetch(`${BASE_URL}/usuarios/${id}`, { method: 'DELETE' });
};

// --- CURSOS ---

export const obtenerCursosAPI = async () => {
  const respuesta = await fetch(`${BASE_URL}/cursos`);
  return await respuesta.json();
};

export const crearCursoAPI = async (curso) => {
  const respuesta = await fetch(`${BASE_URL}/cursos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso)
  });
  return await respuesta.json();
};

export const eliminarCursoAPI = async (id) => {
  await fetch(`${BASE_URL}/cursos/${id}`, { method: 'DELETE' });
};