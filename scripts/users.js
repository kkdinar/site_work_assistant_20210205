const fetch = require('node-fetch');
const config = require('../config.js');

module.exports.findAll = async () => {
    let message;
    let url = config.main_url + 'users';
    let response = await fetch(url);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа 
        message = await response.json();
    } else {
        message = {
            answer: "Ошибка HTTP: " + response.status
        };
    }
    console.log("message.answer=", message.answer);
    return message.answer;
};