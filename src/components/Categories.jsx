import React from 'react'
function Categorias() {
    const categorias = [
        "Finanzas",
        "Marketing",
        "Diseño",
        "Tecnologia",
        "Artesanias",
        "Cocina",
        "Idiomas"
    ]
    return(
        <div className="categorias">
            <h2>Categorias Populares</h2>
            <div className="categorias-container">
                {categorias.map((categoria, index) => (
                    <div key={index} className="categoria-card">
                        </div>
                ))}
            </div>
        </div>
    )
}
export default Categorias