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
        let jsonParser = bodyParser.json();
        app.use(express.json())
        app.get('/users/:id',  this.getLogin.bind(this));
        app.get('/requests/:id',  this.getRequestsById.bind(this));
        app.get('/requestsStatus/:id',  this.getRequestStatusById.bind(this));
        app.post('/registerNewUser', jsonParser, this.registerNewUser.bind(this));
        app.post('/sendRequest', jsonParser, this.sendRequest.bind(this));
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
    getRequestsById(req, res) {
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('id', sql.Int, req.param('id'))
                .execute('getRequestsById')
        }).then(result => {
            res.send(result.recordsets);
        }).catch(err => {
            console.dir(err)
        });
    }
    getRequestStatusById(req, res) {
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('id', sql.Int, req.param('id'))
                .execute('getRequestStatusById')
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
    sendRequest(req, res)
    {
        req.accepts('application/json');
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), req.body.login)
                .input('text', sql.Text, req.body.text)
                .input('type', sql.VarChar(20), req.body.type)
                .execute('sendRequest')
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

