// Импортируем библиотеки и стили
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Main.scss';

// Определяем список дикторов
const availableSpeakers = ['Аружан', 'Алихан'];

const SpeechSynthesisForm = () => {
    // Опреляем состояния
    const [chosenSpeaker, setChosenSpeaker] = useState('');
    const [inputText, setInputText] = useState('Менің атым Дамир болады. Ал сіздің атыңыз кім?');
    const [audioSource, setAudioSource] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Функция выбора диктора
    const handleSpeakerSelection = (speaker) => {
        setChosenSpeaker(speaker);
    };

    // Функция изменения текста
    const handleTextInputChange = (e) => {
        setInputText(e.target.value);
    };

    // Функция синтеза речи
    const handleAudioRequest = async () => {
        // определяем выбран, ли диктор 
        if (!chosenSpeaker) {
            alert('Пожалуйста, выберите диктора.');
            return;
        }
 
        // Определяем статус загрузки
        setIsProcessing(true);

        try {
            // Отправляем POST-запрос 
            const response = await axios.post('http://localhost:3001/synthesize', {
                text: inputText,
                speaker: chosenSpeaker
            }, {
                responseType: 'blob' // Ожидаем получить бинарные данные
            });

            // Определяем URL 
            const audioUrl = URL.createObjectURL(new Blob([response.data]));
            setAudioSource(audioUrl);
        } catch (error) {
            console.error('Ошибка при получении аудио:', error);
        } finally {
            // Убираем стутус загрузки
            setIsProcessing(false);
        }
    };

    return (
        <div className="form">
            <div className="container">
                <div className="form__section">
                    <div className="form__speakers">
                        {availableSpeakers.map((speaker, index) => (
                            <button
                                key={index}
                                className={`form__button ${chosenSpeaker === speaker ? 'form__button--selected' : ''}`}
                                onClick={() => handleSpeakerSelection(speaker)}
                            >
                                {speaker}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="form__section">
                    <textarea
                        className="form__textarea"
                        value={inputText}
                        onChange={handleTextInputChange}
                        placeholder="Введите текст..."
                    />
                </div>
                {audioSource && <audio controls src={audioSource} className="form__audio" />}
                <button className="form__submit" onClick={handleAudioRequest} disabled={isProcessing}>
                    {isProcessing ? 'Загрузка...' : 'Получить аудио'}
                </button>
            </div>
        </div>
    );
}

// Экспортируем SpeechSynthesisForm
export default SpeechSynthesisForm;