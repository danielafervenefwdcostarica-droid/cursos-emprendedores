import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contacto from '../pages/Contacto';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdministradorPerfil from '../pages/AdministradorPerfil';
import ListaDeCursos from '../pages/ListaDeCursos';
import ClientePerfil from '../pages/ClientePerfil';
import Inicio from '../pages/Home';
import SobreNosotros from '../pages/SobreNosotros';

function Routing() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/Contacto' element={<Contacto/>}/>
         <Route path='/Registro' element={<RegisterPage/>}/>
         <Route path='/Login' element={<LoginPage/>}/>
         <Route path='/panelAdministrativo'element={<AdministradorPerfil/>}/>
         <Route path='/PerfilCliente' element={<ClientePerfil/>}/>
         <Route path= '/lista' element={<ListaDeCursos/>}/>
         <Route path='/Sobre-Nosotros' element={<SobreNosotros/>}/>
      </Routes>
    </Router>
  )
}



export default Routing;
