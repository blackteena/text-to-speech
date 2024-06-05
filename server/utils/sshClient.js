// Импортируем класс Client
const { Client } = require('ssh2');

// Делаем экспорт функции для создания нового SSH-клиента
exports.createSSHConnection = () => {
    return new Client();
};