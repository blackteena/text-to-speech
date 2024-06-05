// Устанавливаем переменные окружения
require('dotenv').config();

// Импортируем модули
const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 

// Создаем приложение
const app = express();

// Импортируем маршрут для синтеза
const ttsRoutes = require('./routes/synthesizeRoutes');

// Устанавливаем порты
const SERVER_PORT = process.env.PORT || 3001;

// Настраиваем middleware 
app.use(cors());
app.use(bodyParser.json());

// Настраиваем маршруты
app.use('/', ttsRoutes);

// Запускаем
app.listen(SERVER_PORT, () => {
    console.log(`Прослушиваем порт ${SERVER_PORT}`);
});