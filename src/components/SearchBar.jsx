import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();

    const options = [
        { label: 'Inicio', path: '/' },
        { label: 'Cursos', path: '/cursos' },
        { label: 'Sobre Nosotros', path: '/Sobre-Nosotros' },
        { label: 'Contacto', path: '/Contacto' }
    ];

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = () => {
        if (filteredOptions.length > 0) {
            navigate(filteredOptions[0].path);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return(
        <div className="modern-search" style={{ position: 'relative' }}>
            <div className="modern-search-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            </div>
            <input 
                type="text" 
                placeholder="¿Qué quieres aprender hoy? (ej. Cursos, Contacto)" 
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <button onClick={handleSearch}>Buscar</button>

            {showSuggestions && searchTerm && filteredOptions.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    marginTop: '4px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    zIndex: 10,
                    overflow: 'hidden'
                }}>
                    {filteredOptions.map((option, index) => (
                        <div 
                            key={index}
                            onClick={() => navigate(option.path)}
                            style={{
                                padding: '12px 16px',
                                cursor: 'pointer',
                                borderBottom: index < filteredOptions.length - 1 ? '1px solid #e2e8f0' : 'none',
                                color: '#334155'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default SearchBar;