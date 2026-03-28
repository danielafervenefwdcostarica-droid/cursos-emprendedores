import Navbar from '../components/Navbar';
import ContactoComp from '../components/ContactoComp';

function Contacto() {
  return (
    <div className="modern-home">
        <Navbar />
        <div className="modern-container" style={{ paddingTop: '40px' }}>
            <ContactoComp/>
        </div>
    </div>
  )
}

export default Contacto