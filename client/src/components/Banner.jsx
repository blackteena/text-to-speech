import React from 'react';
import '../styles/Banner.scss'; // Импортируем SCSS стили 
import image from '../assets/banner.png'; // Импортируем картинку

const Banner = () => {
    return (
        <div className='banner'>
            <img src={image} alt="Баннер" className="banner__image" />
        </div>
    ); 
}

export default Banner; // Экспортируем компонент по дефолту
