import React from 'react';
import Routing from './routes/Routing';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
=======
// Importamos el nuevo Routing
import Routing from './routes/Routing.jsx';
import './styles/Dashboard.css'; // O el archivo CSS principal que tengas

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Usamos la nueva etiqueta */}
>>>>>>> 904a23ff299a345a013f93862f2ca81b228f3f70
    <Routing />
  </React.StrictMode>,
);
