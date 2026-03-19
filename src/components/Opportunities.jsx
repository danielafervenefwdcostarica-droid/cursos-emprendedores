import React from 'react'

function Opportunities() {
const opportunities = [
    {
        titulo: "Concurso Nacional de Innovacion",
        descripcion: "Obetener financiamiento para tu proyecto ",
        imagen: ["https://chatgpt.com/s/m_69bc67a323748191a3fce9fd7c9da233", "https://chatgpt.com/s/m_69bc67bf3428819191e0725028b79355", "https://chatgpt.com/s/m_69bc67df0d7081918df2597ccf7a6ccc"]
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

   