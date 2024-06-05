import React from 'react';
import '../styles/Header.scss'; // Импортируем SCSS стили 

const Header = () => {
    return (
        <header className="header"> 
            <div className="container">
                <div className="header__inner">
                    <div className="header__logo">
                        <span>TTS</span> 
                    </div>
                </div>
            </div>
        </header>
    ); 
}

export default Header; // Экспортируем компонент по дефолту
