import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Inicio from "../pages/Home";
import CursosG from '../pages/CursosG'

function Routing() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route  path="/cursos" element={<CursosG/>}/>
            </Routes>
        </Router>
    )
}
export default Routing