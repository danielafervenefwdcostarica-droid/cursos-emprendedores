import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Categories from '../components/CategoriesComp';
import Opportunities from '../components/Opportunities';
import CTA from '../components/CTA';
import Hero from '../components/Hero';




function Inicio() {
    return (
        <div>
            <Navbar />
            <SearchBar />
            <Categories />
            <Opportunities />
            <CTA />
            <Footer />
            <Hero/>

        </div>
    );
}
export default Inicio
