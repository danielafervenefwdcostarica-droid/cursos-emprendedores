import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Categories from '../components/CategoriesComp';
import Opportunities from '../components/Opportunities';
import AboutPlatform from '../components/AboutPlatform';
import PagHome from '../components/PagHome';

function Inicio() {
    return (
        <div className="modern-home">
            <Navbar />
            <div className="modern-container">
                <PagHome />
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
