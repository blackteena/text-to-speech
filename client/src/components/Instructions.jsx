import React from 'react';
import '../styles/Instructions.scss'; // Импортируем SCSS

const Instructions = () => {
    return (
        <div> 
            <div className="instructions"> 
                <div className="container"> 
                    <h2>Инструкция по демонстрации синтеза казахской речи:</h2> 
                    <p>
                        – Вставьте текст на казахском в поле ниже 
                        <br />
                        – Затем нажмите кнопку “Get audio”
                        <br />
                        – Вы найдете аудио вашего текста под полем. Затем нажмите кнопку “Play” чтобы прослушать звук.
                    </p> 
                </div>
            </div>
        </div>
    );
}

export default Instructions; // Экспортируем компонент по дефолту
