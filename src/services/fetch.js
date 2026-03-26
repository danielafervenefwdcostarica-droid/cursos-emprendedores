//GET USUARIOS funcion que consulta al endpoint a traves de un fetch,conuslta al API al Endpoint


async function getUsuarios() {

    try {

        const respuestaServidor = await fetch("http://localhost:3001/usuarios")
      
        
        const datosUsuarios= await respuestaServidor.json();
   
        
        return datosUsuarios;
        
    } catch (error) {
        
        console.error("Error al obtener los usuarios", error);
    }


}

export{getUsuarios}



//GET CURSOS funcion que consulta al endpoint a traves de un fetch,consulta al API al Endpoint


async function getCursos() {

    try {

        const respuestaServidor = await fetch("http://localhost:3001/cursos")
      
        
        const datosCursos= await respuestaServidor.json();
   
        
        return datosCursos;
        
    } catch (error) {
        
        console.error("Error al obtener los cursos", error);
    }


}

export{getCursos}



//POST USUARIOS AQUI S EVA A CREAR LA FUNCION PARA GUARDAR UN NUEVO USUARIO


async function postUsuarios(usuario){

       try {

        const respuesta = await fetch("http://localhost:3001/usuarios",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(usuario)

        })

        const datosUsuarios= await respuesta.json();

        return datosUsuarios;
        
    } catch (error) {
        
        console.error("Error al obtener los usuarios", error);
    }



}

export{postUsuarios}


//PUT


async function putUsuarios(usuario,id){

       try { 

        const respuesta = await fetch("http://localhost:3001/usuarios/"+id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(usuario)

        })

        const datosUsuarios= await respuesta.json();

        return datosUsuarios;
        
    } catch (error) {
        
        console.error("Error al actualizar los cambios", error);
    }
}

export{putUsuarios}


//PATCH




async function patchUsuarios(usuario,id){

       try {

        const respuesta = await fetch("http://localhost:3001/usuarios/"+id,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(usuario)

        })

        const datosUsuarios= await respuesta.json();

        return datosUsuarios;
        
    } catch (error) {
        
        console.error("Error al actualizar los cambios", error);
    }
}

export{patchUsuarios}









//DELETE



async function deleteUsuarios(id){

       try {

        const respuesta = await fetch("http://localhost:3001/usuarios/"+id,{
            method:"DELETE",
        })

        const datosUsuarios= await respuesta.json();

        return datosUsuarios;
        
    } catch (error) {
        
        console.error("Error al Eliminar el registro", error);
    }
}

export{deleteUsuarios}


async function postCursos(cursos) {
         try {

        const respuesta = await fetch("http://localhost:3001/cursos",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(cursos)

        })

        const datosUsuarios= await respuesta.json();

        return datosUsuarios;
        
    } catch (error) {
        
        console.error("Error al obtener los curos", error);
    }
}

export { postCursos };



//PUT CURSOS


async function putCursos(curso,id){

       try {

        const respuesta = await fetch("http://localhost:3001/cursos/"+id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(curso)

        })

        const datosCursos= await respuesta.json();

        return datosCursos;
        
    } catch (error) {
        
        console.error("Error al actualizar el curso", error);
    }
}

export{putCursos}



//DELETE CURSOS



async function deleteCursos(id){

       try {

        const respuesta = await fetch("http://localhost:3001/cursos/"+id,{
            method:"DELETE",
        })

        const datosCursos= await respuesta.json();

        return datosCursos;
        
    } catch (error) {
        
        console.error("Error al Eliminar el curso", error);
    }
}

export{deleteCursos}
