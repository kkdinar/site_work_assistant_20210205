const Koa = require('koa');
const app = new Koa();

const Router = require('@koa/router');
const router = new Router();

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const Pug = require('koa-pug');
const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app //Equivalent to app.use(pug)
});

const config = require('./config.js');
const routes = require('./scripts/routes.js');

router.get('/', routes.get_main);

//Проверка подключения к базе 
//router.get('/testDbConnection', routes.get_testDbConnection);
//router.post('/testDbConnection', routes.post_testDbConnection);
router.get('/1', routes.get_testDbConnection);
router.post('/1', routes.post_testDbConnection);
//Создание базы
//router.get('/createDB', routes.get_createDB);
//router.post('/createDB', routes.post_createDB);
router.get('/2', routes.get_createDB);
router.post('/2', routes.post_createDB);

//Добавить новый документ
router.get('/add/:docID', routes.get_add);
router.post('/add', routes.post_add);
//Удалить документ
router.get('/delete/:docID', routes.get_delete);
router.post('/delete', routes.post_delete);

//Добавить поле в документ
router.get('/addDocColumn/:docID', routes.get_add_docColumn);
router.post('/addDocColumn', routes.post_add_docColumn);
//Удалить поле в документе
router.get('/deleteDocColumn/:docID', routes.get_delete_docColumn);
router.post('/deletDocColumn', routes.post_delete_docColumn);

//Получить журнал 
router.get('/:docID', routes.get_journal);
//Получить содержимое документа
router.get('/:docID/:id', routes.get_doc);
//Сохранить
router.post('/:docID/:id', routes.post_doc);

app.use(router.routes())
app.listen(config.main_port);


/*
router.get("/", async (ctx) => {
    await ctx.render('index', {
        title: "Ассистент - удобный доступ к Вашим данным",
        testDbConnection: "/testDbConnection",
        createDB: "/createDB",
        users: "/users"
    });
});



router.get("/testDbConnection", async (ctx) => {
    await ctx.render('testDbConnection');
    //let message;
    //await testdb.testDbConnection()
    //    .then((mes) => message = mes);
    //ctx.body = message;
});

//const testdb = require('./scripts/testConnectionDB.js');
router.post("/testDbConnection", async (ctx) => {
    let message = await controllers.testDbConnection();
    await ctx.render('testDbConnection', {
        answer: message
    });
});


router.get("/createDB", async (ctx) => {
    await ctx.render('createDB');
});

//const createDB = require('./scripts/createDB.js');
router.post("/createDB", async (ctx) => {
    let force = false;
    let alter = false;
    //{force: true} - удалить таблицы и создать их заново, но уже с нужной нам структурой
    //{alter: true} - обновить базу, добавить новые таблицы и столбцы
    if (ctx.request.body.force) force = true;
    if (ctx.request.body.alter) alter = true;
    let message = await controllers.createDB(force, alter);
    //console.log("message:",message);
    await ctx.render('createDB', {
        answer: message
    });
    //ctx.response.send(`${request.body}`);
    //ctx.body = message;
});

//const users = require("./scripts/users.js");
router.get("/users", async (ctx) => {
    //let message = await createDB.createDB(force, alter);
    let data = await controllers.findAll();
    //console.log("All users:", JSON.stringify(data, null, 2));
    let logins = data.map((arr) => {
        return arr.Login;
    });
    await ctx.render('users', {
        logins: logins,
        add: '/add'
    });
    window = 'users';
});

router.get('/add', async (ctx) => {
    //ctx.body = window;
    let user = false;
    let doc = false;
    if (window == 'users') user = true;
    if (window == 'doc') doc = true;
    await ctx.render('add', {
        user: user,
        doc: doc
    });
});

router.post('/add', async (ctx) => {
    let message;
    let name = '';
    if (ctx.request.body.name) name = ctx.request.body.name;
    if (name != '') {
        if (window == 'users') message = await controllers.create(name);
        //console.log("message:",message);
        await ctx.render('createDB', {
            answer: message
        });
    }
});
*/


/*






*/
/*
router.get('/', async (ctx, next) => {
    //Проверка подключения к базе  
    let message;
    await testdb.testDbConnection()
        .then((mes) => message = mes);
 //   await users.syncSqlite3()
  //      .then((mes) => message = message + mes);

    ctx.body = message;
  });
/*


//Вывод на экран сообщения
app.use(async ctx => {

    //Проверка подключения к базе sqlite3 
    let message;
    await testdb.testDbConnection()
        .then((mes) => message = mes);
 //   await users.syncSqlite3()
  //      .then((mes) => message = message + mes);

    ctx.body = message;
});
*/