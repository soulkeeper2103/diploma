const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql/msnodesqlv8');
const config = {
    user: "archiveClient",
    password: "password",
    server: 'localhost\\DEVELOPER',
    database: 'archiveKnopka',
    port: 50484,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustedConnection: true
    }
}


class Application {
    constructor () {
        // Создаем наше Express-приложение.
        this.expressApp = express();
        this.attachRoutes();
    }

    attachRoutes () {
        let app = this.expressApp;
        // Создадим middleware для обработки JSON-тел запросов, т. е. функцию,
        // которая будет вызываться перед нашими обработчиками и обрабатывать
        // JSON в теле запроса, чтобы наш обработчик получил готовый объект.
        let jsonParser = bodyParser.json();
        app.use(express.json())
        // Назначаем функции-обработчики для GET/POST разных URL. При запросе на
        // указанный первым аргументом адрес, будут вызваны все функции,
        // которые переданы начиная со второго аргумента (их может быть сколько
        // угодно).
        // Важно обратить внимание на .bind - тут мы назначаем в качестве
        // обработчиков методы, а не функции. По сути, метод - это функция,
        // привязанная к объекту, что мы и делаем методом bind. Без него мы
        // получим неопределенный this, так как метод будет вызван как обычная
        // функция. Так следует делать всегда при передаче метода как аргумента.
        // Каждый обработчик принимает два аргумента - объекты запроса и ответа,
        // обозначаемые как req и res.
        app.get('/users/:id',  this.getLogin.bind(this));
        app.post('/registerNewUser', jsonParser, this.registerNewUser.bind(this));
    }


    getLogin(req, res) {
            // Создаем сообщение и возвращаем его клиенту
                sql.connect(config).then(pool => {
                    // Stored procedure
                    return pool.request()
                        .input('id', sql.Int, req.param('id'))
                        .execute('getLoginById')
                }).then(result => {
                    res.send(result.recordsets);
                }).catch(err => {
                    console.dir(err)
                });
    }
    registerNewUser(req, res)
    {
        req.accepts('application/json');
         sql.connect(config).then(pool => {
             // Stored procedure
             return pool.request()
                .input('login', sql.VarChar(24), req.body.login)
                .input('password', sql.VarChar(99), req.body.password)
                .input('name', sql.VarChar(90), req.body.name)
                .input('phone', sql.VarChar(12), req.body.phone)
                .input('email', sql.VarChar(30), req.body.email)
                .input('type', sql.VarChar(13), req.body.type)
                .execute('registerNewUser')
         }).then(result => {
             console.dir("success")
             res.status(200).json({})
         }).catch(err => {
             console.dir(err)
              res.status(404).json({})
         });

    }
}


// Экспортируем наш класс наружу
module.exports = Application;

