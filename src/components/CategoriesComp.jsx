function CategoriesComp() {
    const categories = [
        "Finanzas",
        "Marketing",
        "Diseño",
        "Tecnologia",
        "Artesanias",
        "Cocina",
        "Idiomas"
    ]
    return(
        <div className="categories">
            <h2>Categories Popular</h2>
            <div className="categories-container">
                {categories.map((category, index) => (
                    <div key={index} className="category-card">
                        </div>
                ))}
            </div>
        </div>
    )
}
export default CategoriesComp