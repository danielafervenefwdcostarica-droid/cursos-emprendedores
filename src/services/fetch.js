//GET USUARIOS
async function getUsuarios() {
    try {
        const respuestaServidor = await fetch("http://localhost:3001/usuarios")
        const datosUsuarios = await respuestaServidor.json();
        return datosUsuarios;
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}

export { getUsuarios }

//GET CURSOS
async function getCursos() {
    try {
        const respuestaServidor = await fetch("http://localhost:3001/cursos")
        const datosCursos = await respuestaServidor.json();
        return datosCursos;
    } catch (error) {
        console.error("Error al obtener los cursos", error);
    }
}

export { getCursos }

//POST USUARIOS
async function postUsuarios(usuario) {
    try {
        const respuesta = await fetch("http://localhost:3001/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
        const datosUsuarios = await respuesta.json();
        return datosUsuarios;
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}

export { postUsuarios }

//PUT USUARIOS
async function putUsuarios(usuario, id) {
    try {
        const respuesta = await fetch("http://localhost:3001/usuarios/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
        const datosUsuarios = await respuesta.json();
        return datosUsuarios;
    } catch (error) {
        console.error("Error al actualizar los cambios", error);
    }
}

export { putUsuarios }

// PATCH USUARIOS - Se corrigió el orden de (id, usuario) para consistencia con el resto de la app
// Permite actualizaciones parciales del perfil del usuario sin errores de parámetro
async function patchUsuarios(id, usuario) {
    try {
        const respuesta = await fetch("http://localhost:3001/usuarios/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
        const datosUsuarios = await respuesta.json();
        return datosUsuarios;
    } catch (error) {
        console.error("Error al actualizar los cambios", error);
    }
}

export { patchUsuarios }

//DELETE USUARIOS
async function deleteUsuarios(id) {
    try {
        const respuesta = await fetch("http://localhost:3001/usuarios/" + id, {
            method: "DELETE",
        })
        const datosUsuarios = await respuesta.json();
        return datosUsuarios;
    } catch (error) {
        console.error("Error al Eliminar el registro", error);
    }
}

export { deleteUsuarios }

//POST CURSOS
async function postCursos(cursos) {
    try {
        const respuesta = await fetch("http://localhost:3001/cursos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cursos)
        })
        const datosUsuarios = await respuesta.json();
        return datosUsuarios;
    } catch (error) {
        console.error("Error al obtener los cursos", error);
    }
}

export { postCursos }

//PUT CURSOS
async function putCursos(curso, id) {
    try {
        const respuesta = await fetch("http://localhost:3001/cursos/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(curso)
        })
        const datosCursos = await respuesta.json();
        return datosCursos;
    } catch (error) {
        console.error("Error al actualizar el curso", error);
    }
}

export { putCursos }

//DELETE CURSOS
async function deleteCursos(id) {
    try {
        const respuesta = await fetch("http://localhost:3001/cursos/" + id, {
            method: "DELETE",
        })
        const datosCursos = await respuesta.json();
        return datosCursos;
    } catch (error) {
        console.error("Error al Eliminar el curso", error);
    }
}

export { deleteCursos }

//GET MENSAJES
async function getMensajes() {
    try {
        const respuesta = await fetch("http://localhost:3001/mensajes")
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al obtener los mensajes", error);
    }
}

export { getMensajes }

//DELETE MENSAJES
async function deleteMensajes(id) {
    try {
        await fetch("http://localhost:3001/mensajes/" + id, {
            method: "DELETE",
        })
    } catch (error) {
        console.error("Error al eliminar el mensaje", error);
    }
}

export { deleteMensajes }
