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

<<<<<<< HEAD
//PUT USUARIOS
async function putUsuarios(usuario, id) {
    try {
        const respuesta = await fetch("http://localhost:3001/usuarios/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
=======

//PUT


async function putUsuarios(usuario,id){

       try { 

        const respuesta = await fetch("http://localhost:3001/usuarios/"+id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
>>>>>>> c79e757be4f4fbef8552c828db46a1e74c5cd468
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

//PATCH USUARIOS
async function patchUsuarios(usuario, id) {
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

<<<<<<< HEAD
export { postCursos }
=======
export { postCursos };


>>>>>>> c79e757be4f4fbef8552c828db46a1e74c5cd468

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

<<<<<<< HEAD
export { deleteCursos }
=======
export{deleteCursos}
>>>>>>> c79e757be4f4fbef8552c828db46a1e74c5cd468
