import React from 'react'

function SearchBar() {
    return(
        <div className="search-bar">

            <input type="text" placeholder="Que quieres aprender hoy?" />
            <button>Buscar</button>
        </div>
    )
}
export default SearchBar