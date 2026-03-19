import React from 'react'

function Opportunities() {
const opportunities = [
    {
        titulo: "Concurso Nacional de Innovacion",
        descripcion: "Obetener financiamiento para tu proyecto ",
        imagen: ["https://img.daisyui.com/images/stock/daisyui-hat-1.webp", "https://img.daisyui.com/images/stock/daisyui-hat-2.webp", "https://img.daisyui.com/images/stock/daisyui-hat-3.webp", "https://img.daisyui.com/images/stock/daisyui-hat-4.webp"]
    },
        {
            titulo: "Impulso digital",
            descripcion: "Programa de apoyo para emprendedores digitales"
        },
        {
            titulo:"Beca de emprendimiento social",
            descripcion: "Formacion gratuita en negocios"
        }
    ]
    return (
        <section className="opportunities">
            <div className="opportunities-container">
                {opportunities.map((item, index) => (
                    <div key={index} className="opportunity-card">
                        <h3>{item.titulo}</h3>
                        <p>{item.descripcion}</p>
                        <button>
                            Ver mas
                            </button>

                    </div>
                ))}
            </div>
            </section>
        )
    }
    export default Opportunities

   