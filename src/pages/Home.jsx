import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import Opportunies from '../components/Opportunities';
import CTA from '../components/CTA';
import Cursos from  '../components/Cursos';



function Inicio() {
    return (
        <div>
            <Navbar />
            <SearchBar />
            <Categories />
            <Opportunies />
            <CTA />
            <Footer />
            <Cursos />

        </div>
    );
}
export default Inicio
