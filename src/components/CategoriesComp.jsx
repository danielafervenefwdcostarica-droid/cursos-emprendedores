import React from 'react';

function CategoriesComp() {
    const defaultCategories = [
        { name: "Finanzas", desc: "Gestión contable e inversión.", iconClass: "icon-blue", icon: "₹" },
        { name: "Marketing", desc: "Estrategias de venta.", iconClass: "icon-purple", icon: "📈" },
        { name: "Diseño", desc: "Creatividad visual.", iconClass: "icon-yellow", icon: "🎨" }
    ];

    return (
        <section className="modern-categories">
            <div className="section-header">
                <div>
                    <h2>Categorías Destacadas</h2>
                </div>
            </div>
            <div className="modern-categories-grid">
                {defaultCategories.map((cat, index) => (
                    <div key={index} className="modern-category-card">
                        <div className={`modern-category-icon ${cat.iconClass}`}>
                            {cat.icon}
                        </div>
                        <div className="modern-category-info">
                            <h3>{cat.name}</h3>
                            <p>{cat.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CategoriesComp;