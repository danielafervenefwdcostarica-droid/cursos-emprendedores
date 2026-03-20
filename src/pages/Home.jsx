import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Categories from '../components/CategoriesComp';
import Opportunities from '../components/Opportunities';
import AboutPlatform from '../components/AboutPlatform';
import Hero from '../components/Hero';
import '../styles/modern-theme.css';

function Inicio() {
    return (
        <div className="modern-home">
            <Navbar />
            <div className="modern-container">
                <Hero />
                <SearchBar />
                <Categories />
                <Opportunities />
                <AboutPlatform />
            </div>
            <Footer />
        </div>
    );
}
export default Inicio;
