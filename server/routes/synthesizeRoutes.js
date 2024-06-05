// Импортируем express для создания маршрутизатора
const express = require('express');
// создаем новый экземпляр маршрутизатора
const router = express.Router();
// Импортируем synthesize 
const { synthesize } = require('../controllers/synthesizeController');

// Определяем маршрут
router.post('/synthesize', synthesize);

// Экспортируем маршрутизатор
module.exports = router;