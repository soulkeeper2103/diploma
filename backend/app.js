const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const sql = require('mssql/msnodesqlv8');
const jwt = require('jsonwebtoken');
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
        this.expressApp.use(cors())
    }

    attachRoutes () {
        let app = this.expressApp;
        let jsonParser = bodyParser.json();
        app.use(express.json())
        app.get('/requests',  this.getRequestsByLogin.bind(this));
        app.get('/requests',  this.getRequests.bind(this));
        app.get('/users',  this.getUsers.bind(this));
        app.get('/sendMessages',  this.getSendMessages.bind(this));
        app.get('/receivedMessages',  this.getReceivedMessages.bind(this));
        app.get('/requestsStatus/:id',  this.getRequestStatusById.bind(this));
        app.get('/documents',  this.getDocumentsByLogin.bind(this));
        app.post('/registerNewUser', jsonParser, this.registerNewUser.bind(this));
        app.post('/sendRequest', jsonParser, this.sendRequest.bind(this));
        app.post('/sendMessage', jsonParser, this.sendMessage.bind(this));
        app.post('/sendFeedback', jsonParser, this.sendFeedback.bind(this));
        app.post('/auth', jsonParser, this.auth.bind(this));
        app.post('/changeRequestStatus', jsonParser, this.changeRequestStatus.bind(this));
    }

    getSendMessages(req, res) {
        if (this.checkToken(req.get('Token'))==1) return
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].login)
                .execute('getSendMessages')
        }).then(result => {
            res.send(result.recordsets);
        }).catch(err => {
            console.dir(err)
        });
    }

    getReceivedMessages(req, res) {
        if (this.checkToken(req.get('Token'))==1) return
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].login)
                .execute('getReceivedMessages')
        }).then(result => {
            res.send(result.recordsets);
        }).catch(err => {
            console.dir(err)
        });
    }

    getRequestsByLogin(req, res) {
        if (this.checkToken(req.get('Token'))==1) return
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].login)
                .execute('getRequestsByLogin')
        }).then(result => {
            res.send(result.recordsets);
        }).catch(err => {
            console.dir(err)
        });
    }
    getRequests(req, res) {
        if (this.checkToken(req.get('Token'))==1) return
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            return pool.request()
                .execute('getRequests')
        }).then(result => {
            res.send(result.recordsets);
        }).catch(err => {
            console.dir(err)
        });
    }
    getUsers(req, res) {
        if (this.checkToken(req.get('Token'))==1) return
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            return pool.request()
                .input('type', sql.VarChar(13), jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].type)
                .execute('getUsersList')
        }).then(result => {
            res.send(result.recordsets);
        }).catch(err => {
            console.dir(err)
        });
    }
    getDocumentsByLogin(req, res) {
        if (this.checkToken(req.get('Token'))==1) return
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].login)
                .execute('getDocumentsByLogin')
        }).then(result => {
            res.send(result.recordsets);
        }).catch(err => {
            console.dir(err)
        });
    }
    getRequestStatusById(req, res) {
        if (this.checkToken(req.get('Token'))==1) {console.log("failed");return}
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('id', sql.Int, req.param('id'))
                .execute('getRequestStatusById')
        }).then(result => {
            res.send(result.recordset);
        }).catch(err => {
            console.dir(err)
        });
    }
    registerNewUser(req, res)
    {
        if (this.checkToken(req.body.token)==1) return
        res = this.setHeaders(res);
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
        if (this.checkToken(req.body.token)==1) return
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), jwt.verify(req.body.token, '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].login)
                .input('text', sql.Text, req.body.text)
                .input('type', sql.VarChar(30), req.body.type)
                .execute('sendRequest')
        }).then(result => {
            console.dir("success")
            res.status(200).json({})
        }).catch(err => {
            console.dir(err)
            res.status(404).json({})
        });

    }

    sendMessage(req, res)
    {
        if (this.checkToken(req.body.token)==1) return
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('loginSRC', sql.VarChar(24), jwt.verify(req.body.token, '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].login)
                .input('loginDST', sql.VarChar(24), req.body.logindst)
                .input('text', sql.Text, req.body.text)
                .execute('sendMessage')
        }).then(result => {
            console.dir("success")
            res.status(200).json({})
        }).catch(err => {
            console.dir(err)
            res.status(404).json({})
        });

    }

    sendFeedback(req, res)
    {
        if (this.checkToken(req.body.token)==1) return
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), jwt.verify(req.body.token, '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].login)
                .input('rating', sql.Int , req.body.rating)
                .input('text', sql.Text, req.body.text)
                .execute('sendFeedback')
        }).then(result => {
            console.dir("success")
            res.status(200).json({})
        }).catch(err => {
            console.dir(err)
            res.status(404).json({})
        });

    }

    changeRequestStatus(req, res)
    {
        res = this.setHeaders(res);
        if (this.checkToken(req.body.token)==1) return
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('id', sql.Int, req.body.id)
                .input('status', sql.VarChar(30), req.body.status)
                .execute('changeRequestStatus')
        }).then(result => {
            console.dir("success")
            res.status(200).json({})
        }).catch(err => {
            console.dir(err)
            res.status(404).json({})
        });

    }

    auth(req, res)
    {
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), req.body.login)
                .input('password', sql.VarChar(99), req.body.password)
                .execute('auth')
        }).then(result => {
            if(result.recordset==''){res.status(400).send("invalid pass or login");return}
            console.dir(result)
            let payload = result.recordset
            let token = jwt.sign({payload}, '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?', { algorithm: 'HS512' });
            payload.push(token);
            res.send(payload)
        }).catch(err => {
            console.dir(err)
            res.status(404).json({})
        });
    }
    setHeaders(res)
    {
        res.set({'X-Content-Type-Options':'nosniff',
            'Access-Control-Allow-Origin':'*'})
        return res
    }
    checkToken(token)
    {
        try {
            var decoded = jwt.verify(token, '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?');
            return 0;
        } catch(err) {
            return 1;
        }
    }
}


// Экспортируем наш класс наружу
module.exports = Application;

