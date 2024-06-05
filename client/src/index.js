import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Определяем корн. элемент
const root = ReactDOM.createRoot(document.getElementById('root'));

// Тут рендерится приложение
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
