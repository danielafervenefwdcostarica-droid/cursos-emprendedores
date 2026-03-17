function CardCurso({nombreCurso,descripcionCurso,duraciónCurso,horarioCurso}) {
    return (
        <>
            <div class="card">
                <div class="card-image"></div>
                <div class="category"> {nombreCurso} </div>
                <div class="heading"> {descripcionCurso}
                    <div class="author"> <span class="name">{duraciónCurso} </span> {horarioCurso}</div>
                
                          
                        

                </div>
            </div>
        </>
    )
}
export default CardCurso