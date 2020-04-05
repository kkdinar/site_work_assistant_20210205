const controllers = require("./controllers.js");
let translate = require("./translate.js");; //Переводчик

get_main = async (ctx) => {
    //Получаем данные Главного окна
    let response = await controllers.get({
        type: 'main'
    });
    console.log('main_response=', response.rows);
    //Выводим на экран
    await ctx.render('main', {
        title: response.title,
        docID: 'main',
        rows: response.rows
    });
};

module.exports.get_main = async (ctx) => {
    await get_main(ctx);
}

get_journal = async (ctx) => {
    //Принимаем название документа/таблицы в виде переменной type
    let docID = ctx.params.docID;
    //Получаем список созданных объектов type
    let response = await controllers.get({
        type: 'journal',
        docID
    });
    console.log('journal_response=', response, docID);
    //Перерисовываем окго journal
    await ctx.render('journal', {
        title: response.title,
        docID,
        rows: response.rows
    });
};

module.exports.get_journal = async (ctx) => {
    await get_journal(ctx);
}

get_doc = async (ctx) => {
    console.log(ctx.params);

    //Принимаем название документа/таблицы в виде переменной docID
    let docID = ctx.params.docID;
    //Принимаем id документа/таблицы в виде переменной id
    let id = ctx.params.id;
    //Получаем список ранее созданных объектов docID
    let response = await controllers.get({
        type: 'doc',
        docID,
        id
    });
    console.log('doc_response=', response);

    let rows = translate.toRUS(response.rows);
    await ctx.render('doc', {
        title: response.title,
        docID,
        rows,
        id
    });
    // Object.entries(data[0]).map(([key, value]) => rows[key]=value);
    //for (let key of Object.keys(data[0])){
    //    console.log('key=', key);
    //}
    //console.log('rows=', rows);
    //Создаём объект, где перечислены Name - название документа, Table - его таблица
    //data.forEach(row => {
    //    if (type == 'users') rows[row.id] = row.Name
    //   else rows[row.Name] = row.Table;
    //}); 

};

module.exports.get_doc = async (ctx) => {
    await get_doc(ctx);
}

module.exports.post_doc = async (ctx) => {
    let docID = ctx.request.body.docID;
    let id = ctx.request.body.id;
    let docColumns = {};
    Object.entries(ctx.request.body).map(([key, value]) => {
        if (key != 'docID')
            if (key != 'id') docColumns[key] = value;
    });
    console.log('put_Obj', docColumns);
    //ctx.params.docID = docID;
    // ctx.params.id = id;
    docColumns = translate.toENG(docColumns);
    //Сохраняем изменения
    let response = await controllers.post({
        type: 'doc',
        docID,
        id,
        docColumns
    });

    ctx.params.docID = docID;
    await get_journal(ctx);
    /*
    let data = await controllers.get({
        title: "Ассистент - удобный доступ к Вашим данным",
        docID,
        id
    });
    let rows = data[0];
    let rowsToRUS = translate.toRUS(rows);
    await ctx.render('doc', {
        docID,
        rows: rowsToRUS,
        id,
        response
    });*/
};

module.exports.get_add = async (ctx) => {
    //Принимаем название документа/таблицы в виде переменной docID
    let docID = ctx.params.docID;
    let response = ctx.request.body.response;
    await ctx.render('add', {
        docID,
        response
    });
};

module.exports.post_add = async (ctx) => {
    console.log('post_add_body=', ctx.request.body);
    let docID = ctx.request.body.docID;
    let id = ctx.request.body.id;
    let Name = ctx.request.body.name;
    let Login = ctx.request.body.Login;
    let Password = ctx.request.body.Password;
    let Password2 = ctx.request.body.Password2;
    let error = '';
    let response = '';
    let _type;
    let _docColumns = {};
    let _docID;
    switch (docID) {
        case 'main':
            if (!Name) error = 'Необходимо заполнить поле "Наименование"';
            _type = 'main';
            _docColumns = {
                Name
            };
            break;

        case '3':
            if (!Login) error = 'Поле "Логин" НЕ заполнено'
            else if (!Password) error = 'Поле "Пароль" НЕ заполнено'
            else if (!Password2) error = 'Поле "Повторите пароль" НЕ заполнено'
            else if (Password != Password2) error = 'Пароли НЕ совпадают'
            _docColumns = {
                Login,
                Password
            };
            _docID = '3';
            _type = 'journal';
            break;

        default:
            _type = 'journal';
            _docID = docID;
            //if (ctx.request.body.name == '') response = 'Необходимо заполнить поле "Наименование"';
            //docColumns = {
            //     dataTypes: ctx.request.body.radio,
            //     Name: ctx.request.body.name
            //};
            break;
    }

    if (error == '') { //Добавляем в базу
        await controllers.post({
            type: _type,
            docID: _docID,
            docColumns: _docColumns
        });
        switch (docID) {
            case 'main':
                await get_main(ctx);
                break;
            default:
                ctx.params.docID = docID;
                await get_journal(ctx);
                break;
        }

    } else {
        await ctx.render('add', {
            docID,
            response: error,
            id
        });
    }
};

module.exports.get_add_docColumn = async (ctx) => {
    let docID = ctx.params.docID;
    let response = ctx.request.body.response;
    await ctx.render('addDocColumn', {
        docID,
        response
    });
};

module.exports.post_add_docColumn = async (ctx) => {
    console.log('post_add_docColumn=', ctx.request.body);
    let docID = ctx.request.body.docID;
    let type = 'docColumns';
    let error = '';
    let Name = ctx.request.body.name;
    let dataTypes = ctx.request.body.radio;
    if (!Name) error = 'Необходимо заполнить поле "Наименование"';
    let docColumns = {};
    docColumns = {
        Name,
        dataTypes
    };
    if (error == '') { //Добавляем в базу
        await controllers.post({
            type,
            docID,
            docColumns
        });
        ctx.params.docID = docID;
        await get_journal(ctx);
    } else {
        await ctx.render('addDocColumn', {
            docID,
            response: error
        });
    }
};
module.exports.get_delete_docColumn = async (ctx) => {
    let docID = ctx.params.docID;
    //let response = ctx.request.body.response;
    let response = await controllers.get({
        type: 'docColumns',
        docID
    });
    //console.log('get_docColumns=',response);

    await ctx.render('deletDocColumn', {
        title: response.title,
        docID,
        rows: response.rows
    });
};

module.exports.post_delete_docColumn = async (ctx) => {
    console.log('post_delete.body=', ctx.request.body);
    let type = 'docColumns';
    let docID = ctx.request.body.docID;
    let id = ctx.request.body.radio;
    await controllers.delete({
        type,
        docID,
        id
    });
    ctx.params.docID = docID;
    await get_journal(ctx);
};

module.exports.get_delete = async (ctx) => {
    //Принимаем название документа/таблицы в виде переменной docID
    let docID = ctx.params.docID;
    let response = ctx.request.body.response;
    let _rows = {};
    switch (docID) {
        case 'main':
            //Получаем данные Главного окна
            response = await controllers.get({
                type: 'main'
            });
            console.log('response.rows=', response.rows);
            //Фильтруем разрешённые к удалению объекты
            Object.entries(response.rows).forEach(([key, value]) => {
                if (key != 1)
                    if (key != 2)
                        if (key != 3)
                            _rows[key] = value;
            });
            break;

        case '3':
            response = await controllers.get({
                type: 'journal',
                docID: '3'
            });
            Object.entries(response.rows).forEach(([key, value]) => {
                if (key != 1)//admin
                    _rows[key] = value;
            });
            break;

        default:
            response = await controllers.get({
                type: 'journal',
                docID
            });
            _rows = response.rows;
            break;
    };
    //Перерисовываем окно delete
    await ctx.render('delete', {
        title: response.title,
        docID,
        rows: _rows
    });
    //Получаем список созданных объектов type
    // let response = await controllers.get({
    //     type: docID,
    //     docID
    // });
    // console.log('delete_response', response, docID);

    //let rows = {};
    // for (let key of Object.keys(data[0])) 


    //
    //Создаём объект, где перечислены Name - название документа, Table - его таблица
    //data.forEach(row => {
    //    if (docID == 'main') rows[row.id] = row.Name; //main
    //    else if (docID == '3') rows[row.id] = row.ФИО; //users
    //    else rows[row.id] = '№ ' + row.id + ' от ' + row.createdAt;
    //});
    //response = '';

};

module.exports.post_delete = async (ctx) => {
    console.log('post_delete', ctx.request.body);
    let docID = ctx.request.body.docID;
    let _type;
    let _docID;
    let _id;
    switch (docID) {
        case 'main':
            _type = 'main';
            _docID = ctx.request.body.radio;
            break;

        default:
            _type = 'journal';
            _docID = docID;
            _id = ctx.request.body.radio;
            break;
    }
    //Удаляем отмеченный объект по id 
    let response = await controllers.delete({
        type: _type,
        docID: _docID,
        id: _id
    });
    if (_type == 'main')
        await get_main(ctx);
    else {
        ctx.params.docID = docID;
        await get_journal(ctx);
    }

    //Собираем отмеченные галочкой объекты, кроме docID
    // let arrID = Object.keys(ctx.request.body).filter(row => row != 'docID');
    //Переводим в число
    //charID.forEach(row => {
    //    arrID.push(Number.parseInt(row));
    //});



    // let response = await controllers.get({
    //     docID
    // });
    // let rows = {};
    //Фильтруем разрешённые к удалению объекты
    // data = response.rows.filter(row => {
    //     if (docID == 'main') {
    //         if (row.id != 1)
    //              if (row.id != 2)
    //                  if (row.id != 3)
    //                      return row;
    //     } else return row;
    //  });
    //Создаём объект, где перечислены Name - название документа, Table - его таблица
    //  data.forEach(row => {
    //      if (docID == 'main') rows[row.id] = row.Name; //main
    //      else if (docID == '3') rows[row.id] = row.ФИО; //users
    //      else rows[row.id] = '№ ' + row.id + ' от ' + row.createdAt;
    //  });

    //Перерисовываем окно delete
    // await ctx.render('delete', {
    //     docID,
    //     rows,
    //     response: response_delete
    // });
};





module.exports.get_testDbConnection = async (ctx) => {
    await ctx.render('testDbConnection', {
        docID: 1
    });
};

module.exports.post_testDbConnection = async (ctx) => {
    let response = await controllers.get({
        type: 'journal',
        id: 1
    });
    await ctx.render('testDbConnection', {
        response
    });
};

module.exports.get_createDB = async (ctx) => {
    await ctx.render('createDB', {
        docID: 2
    });
};

module.exports.post_createDB = async (ctx) => {
    let force = false;
    let alter = false;
    //{force: true} - удалить таблицы и создать их заново, но уже с нужной нам структурой
    //{alter: true} - обновить базу, добавить новые таблицы и столбцы
    if (ctx.request.body.force) force = true;
    if (ctx.request.body.alter) alter = true;
    let response = await controllers.createDB(force, alter);
    await ctx.render('createDB', {
        response
    });
};
/*
module.exports.get_users = async (ctx) => {
    let data = await controllers.findAll();
    let logins = data.map((arr) => {
        return arr.Login;
    });
    await ctx.render('users', {
        logins: logins,
        add: '/add'
    });
    window = 'users';
};
*/