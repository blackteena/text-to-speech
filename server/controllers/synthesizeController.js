// Импортируем модули
const path = require('path'); 
const fs = require('fs'); // 
const { createSSHConnection } = require('../utils/sshClient'); 

// Устанавливаем переменные окружения и имя для аудиофайла
const ENV_NAME = process.env.ENV_NAME;
const audioFileName = 'example.wav';

// Делаем экспорт функции
exports.synthesize = (req, res) => {
    const { text, speaker } = req.body; // Берем текст

    // Устанавливаем номера для спикеров
    const speakerMap = {
        'Аружан': '1',
        'Алихан': '2',
    };
    const speakerNumber = speakerMap[speaker]; // Получаем номера спикеров

    if (!speakerNumber) {
        return res.status(400).send('Выбран неверный спикер.'); // Проверяем выбранность спикера
    }

    // Устанавливаем пути к файлам
    const remoteAudioFilePath = `/home/${process.env.SSH_USERNAME}/espnet/egs2/Kazakh_TTS/tts1/synthesized_wavs/${audioFileName}`;
    const localAudioFilePath = path.join(__dirname, '../../', audioFileName);

    // Устанавливаем команды 
    const remoteCommand = `
        cd /home/${process.env.SSH_USERNAME}/espnet/egs2/Kazakh_TTS/tts1 &&
        source ~/miniconda3/etc/profile.d/conda.sh &&
        conda activate ${ENV_NAME} &&
        rm -f /home/${process.env.SSH_USERNAME}/espnet/egs2/Kazakh_TTS/tts1/exp && 
        ln -s /home/${process.env.SSH_USERNAME}/espnet/egs2/Kazakh_TTS/tts1/exps/exp-${speakerNumber} /home/${process.env.SSH_USERNAME}/espnet/egs2/Kazakh_TTS/tts1/exp &&
        python synthesize.py --text "${text}"
    `;

    const conn = createSSHConnection(); // SSH клиент

    // Определяем обработчик событий "ready"
    conn.on('ready', () => {
        console.log('Client ready');

        // Вызываем команду
        conn.exec(remoteCommand, (err, stream) => {
            if (err) {
                console.error(`Ошибка при выполнении команды: ${err.message}`);
                return res.status(500).send('Ошибка при синтезе речи');
            }

            // Определяем обработчики событий для "stream"
            stream.on('close', (code) => {
                if (code === 0) {
                    // При условии, что все выполнилось корректно устанавливаем SFTP соединение
                    conn.sftp((err, sftp) => {
                        if (err) {
                            console.error(`Ошибка при установке SFTP соединения: ${err.message}`);
                            return res.status(500).send('Ошибка при передаче файла');
                        }

                        // Переносим файл с удаленного сервера на локальный
                        sftp.fastGet(remoteAudioFilePath, localAudioFilePath, (err) => {
                            if (err) {
                                console.error(`Ошибка при передаче файла: ${err.message}`);
                                return res.status(500).send('Ошибка при передаче файла');
                            }

                            // Проверяем, существует ли локальный файл
                            fs.access(localAudioFilePath, fs.constants.F_OK, (err) => {
                                if (err) {
                                    console.error(`Файл не существует: ${err.message}`);
                                    return res.status(500).send('Файл не существует');
                                }

                                // Устанавливаем тип контента
                                res.setHeader('Content-Type', 'audio/wav');
                                // Отправляем файл клиенту
                                res.sendFile(localAudioFilePath, err => {
                                    if (err) {
                                        console.error(`Ошибка при отправке файла: ${err.message}`);
                                        res.status(500).send('Ошибка при отправке файла');
                                    } else {
                                        // Удаляем локальный файл
                                        fs.unlink(localAudioFilePath, (err) => {
                                            if (err) {
                                                console.error(`Ошибка при удалении файла: ${err.message}`);
                                            }
                                        });
                                    }
                                });
                            });

                            // Окончание
                            conn.end();
                        });
                    });
                } else {
                    console.error(`Команда завершилась с кодом: ${code}`);
                    res.status(500).send('Ошибка при синтезе речи');
                    conn.end();
                }
            }).on('data', (data) => {
                console.log('STDOUT: ' + data); // Обрабатываем вывод
            }).stderr.on('data', (data) => {
                console.error('STDERR: ' + data); // Обрабатываем вывод ошибок
            });
        });
    }).connect({
        host: process.env.SSH_HOST, 
        port: process.env.SSH_PORT, 
        username: process.env.SSH_USERNAME, 
        password: process.env.SSH_PASSWORD 
    }); 
};
