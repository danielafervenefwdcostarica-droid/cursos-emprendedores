import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OportunidadesDetallesComp from '../components/Oportunidades-Detalles';

const OportunidadesDetalles = () => {
    return (
        <div className="modern-home">
            <Navbar />
            <main>
                <OportunidadesDetallesComp />
            </main>
            <Footer />
        </div>
    );
};

export default OportunidadesDetalles;
