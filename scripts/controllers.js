const fetch = require('node-fetch');
const config = require('../config.js');
const {
    URL
} = require('url');

module.exports.get = async ({
    type,
    docID = '',
    id = '',
    docColumns = ''
}) => {
    let message;
    let url = new URL(config.main_url);
    url.searchParams.set('type', type);
    if (docID != '') url.searchParams.set('docID', docID);
    if (id != '') url.searchParams.set('id', id);
    if (docColumns != '') url.searchParams.set('docColumns', docColumns);
    // console.log('url=', url);
    let params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    //Посылаем запрос
    let response = await fetch(url, params);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа 
        message = await response.json();
    } else {
        message = {
            response: "Ошибка HTTP: " + response.status + ' ' + response.statusText
        };
    }
    return message.response;
};

module.exports.post = async ({
    type,
    docID,
    id,
    docColumns
}) => {
    let message;
    let url = config.main_url;
    //console.log('url=', url);

    let params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ //Собираем параметры 
            type,
            docID,
            id,
            docColumns
        })
    };
    //Посылаем запрос
    let response = await fetch(url, params);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа 
        message = await response.json();
    } else {
        message = {
            response: "Ошибка HTTP: " + response.status + ' ' + response.statusText
        };
    }
    return message.response;

};

module.exports.delete = async ({
    type,
    docID,
    id,
    docColumns
}) => {
    let message;
    let url = config.main_url;
    //console.log('url', url);
    let params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ //Собираем параметры 
            type,
            docID,
            id,
            docColumns
        })
    };
    //Посылаем запрос
    let response = await fetch(url, params);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа 
        message = await response.json();
    } else {
        message = {
            response: "Ошибка HTTP: " + response.status + ' ' + response.statusText
        };
    }
    return message.response;
};

module.exports.createDB = async (force, alter) => {
    let message;
    let url = config.main_url + 'createDB';
    let params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ //Собираем параметры создания базы
            force: force,
            alter: alter
        })
    };
    //Посылаем запрос
    let response = await fetch(url, params);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа 
        message = await response.json();
    } else {
        message = {
            response: "Ошибка HTTP: " + response.status + ' ' + response.statusText
        };
    }
    return message.response;
};
/*
module.exports.testDbConnection = async () => {
    let message;
    let url = config.main_url + 'testDbConnection';
    let response = await fetch(url);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа 
        message = await response.json();
    } else {
        message = {
            response: "Ошибка HTTP: " + response.status + ' ' + response.statusText
        };
    }
    return message.response;
};


*/
/*
module.exports.findAll = async () => {
    let message;
    let url = config.main_url + 'users';
    let response = await fetch(url);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа 
        message = await response.json();
    } else {
        message = {
            response: "Ошибка HTTP: " + response.status + ' ' + response.statusText
        };
    }
    return message.response;
};
*/