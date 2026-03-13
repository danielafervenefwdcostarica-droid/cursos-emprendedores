import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para tu página de registro */}
        <Route path="/registro" element={<RegisterPage />} />
        
        {/* Cuando tus compañeros hagan el Login, lo agregarás aquí así: */}
        {/* <Route path="/login" element={<LoginPage />} /> */}

        {/* Si alguien entra a una ruta que no existe o a la raíz, lo mandamos al registro por ahora */}
        <Route path="*" element={<Navigate to="/registro" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;