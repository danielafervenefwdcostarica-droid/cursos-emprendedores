import React, { useState } from 'react';
import '../styles/Carousel.css';

const images = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://socialhacks.agency/wp-content/uploads/2023/08/30-emprendedores-exitosos-que-cambiaron-el-mundo.webp",
  "https://universidadeuropea.com/resources/media/images/tipos-de-emprendedores-800x450.original.jpg",
  "https://metodoegm.com/wp-content/uploads/2024/07/caracteristicas-de-emprendedor-tecnologico.jpg",
  "https://www.infobae.com/new-resizer/4pxL_u7VRklOxSYX4Jsc0LY8Ceg=/arc-anglerfish-arc2-prod-infobae/public/QG7XZH2J7NG63DFFPSEF2OPFB4.jpg"
];

function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      {images.map((src, index) => (
        <div key={index} className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}>
          <img src={src} className="carousel-image" alt={`Slide ${index + 1}`} />
        </div>
      ))}
      <button onClick={prevSlide} className="carousel-button prev">❮</button>
      <button onClick={nextSlide} className="carousel-button next">❯</button>
    </div>
  );
}

export default HomeCarousel;
