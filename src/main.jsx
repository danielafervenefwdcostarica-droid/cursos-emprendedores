<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    </StrictMode>,
)
=======
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
>>>>>>> 904a23ff299a345a013f93862f2ca81b228f3f70
