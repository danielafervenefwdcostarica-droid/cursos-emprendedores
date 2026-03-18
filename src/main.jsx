import React from 'react';
import ReactDOM from 'react-dom/client';
// Importamos el nuevo Routing
import Routing from './routes/Routing.jsx';
import './styles/Dashboard.css'; // O el archivo CSS principal que tengas

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Usamos la nueva etiqueta */}
    <Routing />
  </React.StrictMode>,
);