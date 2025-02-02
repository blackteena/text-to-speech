import React from 'react';
import '../styles/Info.scss'; // Импортируем SCSS стили

const Info = () => {
    return (
        <div className="info"> 
            <div className="container"> 
                <h2 className="info__title">Преобразование казахского текста в речь-2</h2> 
                <p className="info__description">
                    {/* Информация о KazakhTTS */}
                    В целях поддержки исследований, инноваций и продвижения казахского языка в цифровой среде в 2021 году была создана база данных «KazakhTTS», включающая записи казахской речи и аудио.
                    <br />
                    <br />
                    KazakhTTS представляет собой высококачественный набор речевых данных с открытым доступом, включающий более 90 часов казахской речи и аудио, записанных профессиональными дикторами (как мужчинами, так и женщинами). Этот набор данных привлек значительное внимание как научного сообщества, так и индустрии, и был загружен более 500 раз за первый год.
                    <br />
                    <br />
                    Набор данных KazakhTTS2 можно использовать для разработки программ преобразования казахского текста в речь для различных приложений, включая интерактивные системы, виртуальных помощников, навигационные системы, автоматические объявления и вспомогательные технологии для людей с особыми потребностями.
                </p>
            </div>
        </div>
    );
}

export default Info; // Экспортируем компонент по дефолту
