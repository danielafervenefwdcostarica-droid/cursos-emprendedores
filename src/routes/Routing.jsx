import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/home.css';
import '../styles/Admin.css';
import '../styles/Dashboard.css';
import '../styles/RegisterPage.css';
import Contacto from '../pages/Contacto';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdministradorPerfil from '../pages/AdministradorPerfil';
import ListaDeCursos from '../pages/Cursos';
import ClientePerfil from '../pages/ClientePerfil';
import Inicio from '../pages/Home';
import SobreNosotros from '../pages/SobreNosotros';
import OportunidadesDetalles from '../pages/OportunidadesDetalles';
import RutasPrivadas from './RutasPrivadas';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/Contacto' element={<Contacto />} />
        <Route path='/Registro' element={<RegisterPage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/panelAdministrativo' element={<AdministradorPerfil />} />
        <Route path='/PerfilCliente' element={<RutasPrivadas children={<ClientePerfil />} />} />
        <Route path='/cursos' element={<ListaDeCursos />} />
        <Route path='/Sobre-Nosotros' element={<SobreNosotros />} />
        <Route path='/Oportunidades-Detalles' element={<OportunidadesDetalles />} />
      </Routes>
    </Router>
  )
}

export default Routing;
