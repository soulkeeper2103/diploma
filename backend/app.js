const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const sql = require('mssql/msnodesqlv8');
const jwt = require('jsonwebtoken');
const generatePassword = require('password-generator');
const nodemailer = require('nodemailer');
const UsernameGenerator = require('username-generator');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
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
const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: "soulkeeper2103",
        pass: "Qwerty99"
    }
});


class Application {
    constructor () {
        // Создаем наше Express-приложение.
        this.expressApp = express();
        this.attachRoutes();
        this.expressApp.use(cors())
        this.expressApp.use('/lk/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    attachRoutes () {
        let app = this.expressApp;
        let jsonParser = bodyParser.json();
        app.use(express.json())
        app.get('/lk/api/requests',  this.getRequestsByLogin.bind(this));
        app.get('/lk/api/requestsAll',  this.getRequests.bind(this));
        app.get('/lk/api/users',  this.getUsers.bind(this));
        app.get('/lk/api/sendMessages',  this.getSendMessages.bind(this));
        app.get('/lk/api/receivedMessages',  this.getReceivedMessages.bind(this));
        app.get('/lk/api/requestsStatus/:id',  this.getRequestStatusById.bind(this));
        app.get('/lk/api/documents',  this.getDocumentsByLogin.bind(this));
        app.get('/lk/api/user',  this.getDataByLogin.bind(this));
        app.get('/lk/api/feedbacks',  this.getFeedbacks.bind(this));
        app.post('/lk/api/registerNewUser', jsonParser, this.registerNewUser.bind(this));
        app.post('/lk/api/orderDocuments', jsonParser, this.orderDocuments.bind(this));
        app.post('/lk/api/sendRequest', jsonParser, this.sendRequest.bind(this));
        app.post('/lk/api/changeData', jsonParser, this.changeData.bind(this));
        app.post('/lk/api/changePassword', jsonParser, this.changePassword.bind(this));
        app.post('/lk/api/sendUnauthorizedRequest', jsonParser, this.sendUnauthorizedRequest.bind(this));
        app.post('/lk/api/sendMessage', jsonParser, this.sendMessage.bind(this));
        app.post('/lk/api/sendFeedback', jsonParser, this.sendFeedback.bind(this));
        app.post('/lk/api/auth', jsonParser, this.auth.bind(this));
        app.post('/lk/api/changeRequestStatus', jsonParser, this.changeRequestStatus.bind(this));
        app.post('/lk/api/getFeedbackByLogin', jsonParser, this.getFeedbackByLogin.bind(this));
        app.post('/lk/api/restorePassword', jsonParser, this.restorePassword.bind(this));
    }

    getFeedbacks(req, res) {
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .execute('getFeedbacks')
        }).then(result => {
            res.send(result.recordsets);
        }).catch(err => {
            console.dir(err)
        });
    } // все отзывы
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
    }  // отправленные сообщения
    getDataByLogin(req, res) {
        if (this.checkToken(req.get('Token'))==1) return
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].login)
                .execute('getDataByLogin')
        }).then(result => {
            res.send(result.recordset);
        }).catch(err => {
            console.dir(err)
        });
    } // данные по логину
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
    } // полученные сообщения
    getRequestsByLogin(req, res) {
        if (this.checkToken(req.get('Token'))==1) return
        if (jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].type!="Клиент") {res.set(403); return}
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
    } // отправленные запросы
    getRequests(req, res) {
        if (this.checkToken(req.get('Token'))==1) return
        if (jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].type!="Администратор") {res.set(403); return}
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            return pool.request()
                .execute('getRequests')
        }).then(result => {
            res.send(result.recordsets);
        }).catch(err => {
            console.dir(err)
        });
    } // все запросы
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
    } // все пользователи
    getDocumentsByLogin(req, res) {
        if (this.checkToken(req.get('Token'))==1) return
        if (jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].type!="Клиент") {res.set(403); return}
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
    } // документы пользователя
    getRequestStatusById(req, res) {
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
    registerNewUser(req, res) {
        if (this.checkToken(req.body.token)==1) return
        if (jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].type!="Администратор") {res.set(403); return}
        let username = UsernameGenerator.generateUsername();
        let exist=0
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), username)
                .input('phone', sql.VarChar(12), req.body.phone)
                .input('email', sql.VarChar(30), req.body.email)
                .execute('checkExist')
        }).then(result => {
            exist=result.recordset[0].res
            if(result.recordset[0].res!=0) {res.send(result.recordset); res.end; return}
        }).catch(err => {
            console.dir(err)
        });
        let pass = this.generateStrongPassword();
        if(exist==0) {
            sql.connect(config).then(pool => {
                // Stored procedure
                return pool.request()
                    .input('login', sql.VarChar(24), username)
                    .input('password', sql.VarChar(99), pass)
                    .input('name', sql.VarChar(90), req.body.name)
                    .input('phone', sql.VarChar(12), req.body.phone)
                    .input('email', sql.VarChar(30), req.body.email)
                    .input('type', sql.VarChar(13), req.body.type)
                    .execute('registerNewUser')
            }).then(result => {
                console.dir("success")
                var message = {
                    from: "soulkeeper2103@yandex.ru",
                    to: req.body.email,
                    subject: "Ваш логин и пароль для входа в систему Архива Кнопка",
                    text: req.body.name + ",Вы успешно зарегистрированы в системе Архива Кнопка. Поздравляем!\n" +
                        "Ваш логин: " + username + "\nВаш пароль: " + pass,
                };
                transporter.sendMail(message, (error, info) => {
                    if (error) {
                        console.log('Error occurred');
                        console.log(error.message);
                        return process.exit(1);
                    }
                })
                res.status(200).json({})
            }).catch(err => {
                console.dir(err)
            });
        }

    }
    orderDocuments(req, res) {
        if (jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].type!="Клиент") {res.set(403); return}
        let message = {
            from: "soulkeeper2103@yandex.ru",
            to: '',
            subject: "Ваши документы",
            text: '',
            attachments: []
        };

        if (this.checkToken(req.body.token)==1) return
        res = this.setHeaders(res);

        for (let i in req.body.docs)
        {sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('ids', sql.Int,  req.body.docs[i].id)
                .execute('getDocuments')
        }).then(result => {
            console.dir(result.recordset)
            message.attachments.push({
                //filename: result.recordset[0].src.replace(/^.*[\\/]/, ''),
                path:  result.recordset[0].src
            })
        }).catch(err => {
            console.dir(err)
        });}

        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), jwt.verify(req.body.token, '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].login)
                .execute('getDataByLogin')
        }).then(result => {
            message.to=result.recordset[0].email
            message.text=result.recordset[0].name + ", Заказ документов выполнен успешно!"
            console.dir('sended')
            console.dir(message)
            res.status(200)
            transporter.sendMail(message, (error, info) => {
                if (error) {
                    console.log('Error occurred');
                    console.log(error.message);
                    return process.exit(1);
                }
            })
            res.status(200).json({})
        }).catch(err => {
            console.dir(err)
        });


    }
    sendRequest(req, res) {
        if (jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].type!="Клиент") {res.set(403); return}
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
        });

    }
    changePassword(req, res){
        if (this.checkToken(req.body.token)==1) return
        res = this.setHeaders(res);

        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), jwt.verify(req.body.token, '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].login)
                .input('oldPassword', sql.VarChar(99), req.body.oldPassword)
                .input('newPassword', sql.VarChar(99), req.body.newPassword)
                .execute('changePassword')
        }).then(result => {
            console.dir("success")
            res.send(result.recordset)
        }).catch(err => {
            console.dir(err)
        });

    }
    changeData(req, res) {
        if (this.checkToken(req.body.token)==1) return
        res = this.setHeaders(res);

        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), req.body.login)
                .input('oldLogin', sql.VarChar(24), jwt.verify(req.body.token, '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].login)
                .input('phone', sql.VarChar(12), req.body.phone)
                .input('name', sql.VarChar(90), req.body.name)
                .input('password', sql.VarChar(99), req.body.password)
                .input('email', sql.VarChar(30), req.body.email)
                .execute('changeData')
        }).then(result => {
            console.dir("success")
            if(!result.recordset[0].res) {
                let payload = result.recordset
                let token = jwt.sign({payload}, '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?', {algorithm: 'HS512'});
                payload.push(token);
                res.send(payload)
                return
            }
            res.send(result.recordset)
        }).catch(err => {
            console.dir(err)
        });

    }
    sendUnauthorizedRequest(req, res){
        let pass = this.generateStrongPassword();
        let username = UsernameGenerator.generateUsername();
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            return pool.request()
                .input('login', sql.VarChar(24), username)
                .input('comment', sql.Text, req.body.text)
                .input('type', sql.VarChar(30), req.body.type)
                .input('password', sql.VarChar(99), pass)
                .input('name', sql.VarChar(90), req.body.name)
                .input('phone', sql.VarChar(12), req.body.phone)
                .input('email', sql.VarChar(30), req.body.email)
                .execute('sendUnauthorizedRequest')
        }).then(result => {
            console.dir(result.recordset[0])
            res.send(result.recordset)
            let message
            if(result.recordset[0].res==0)
            {
                message = {
                    from: "soulkeeper2103@yandex.ru",
                    to: req.body.email,
                    subject: "Заявка отправлена",
                    text: req.body.name + ",Заявка успешно отправлена. Поздравляем! Номер заявки: " + result.recordset[0].id + "\n Ваши учетные данные от личного кабинета\n" +
                        "Ваш логин: " + username + "\nВаш пароль: " + pass,
                };
            }
            if(result.recordset[0].res==1)
            {
                message = {
                    from: "soulkeeper2103@yandex.ru",
                    to: req.body.email,
                    subject: "Заявка отправлена",
                    text: result.recordset[0].name + ",Заявка успешно отправлена. Поздравляем!  Номер заявки:" + result.recordset[0].id,
                };
            }
            if(result.recordset[0].res==1||result.recordset[0].res==0)
                transporter.sendMail(message, (error, info) => {
                    if (error) {
                        console.log('Error occurred');
                        console.log(error.message);
                        return process.exit(1);
                    }
                })
        }).catch(err => {
            console.dir(err)
        });

    }
    sendMessage(req, res) {
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
        });
    }
    getFeedbackByLogin(req, res) {
        if (jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].type!="Клиент") {res.set(403); return}
        if (this.checkToken(req.body.token)==1) return
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), jwt.verify(req.body.token, '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].login)
                .execute('getFeedbackByLogin')
        }).then(result => {
            res.status(200).send(result.recordset)
        }).catch(err => {
            console.dir(err)
        });

    }
    restorePassword(req, res) {
        let pass = this.generateStrongPassword();
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('email', sql.VarChar(30), req.body.email)
                .input('password', sql.VarChar(99), pass)
                .execute('restorePassword')
        }).then(result => {
            res.send(result.recordset)
            if(result.recordset[0].res==1) {res.status(200); return}
            else
            {
                var message = {
                    from: "soulkeeper2103@yandex.ru",
                    to: req.body.email,
                    subject: "Восстановление учетных данных",
                    text: result.recordset[0].name + ", Ваши логин и пароль для входа в систему!\n" +
                        "Ваш логин: " + result.recordset[0].login + "\nВаш пароль: " + pass,
                };
                transporter.sendMail(message, (error, info) => {
                    if (error) {
                        console.log('Error occurred');
                        console.log(error.message);
                        return process.exit(1);
                    }
                })
                res.status(200).json({});
                return
            }
        }).catch(err => {
            console.dir(err)
        });

    }
    sendFeedback(req, res) {
        if (jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].type!="Клиент") {res.set(403); return}
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
        });

    }
    changeRequestStatus(req, res){
        res = this.setHeaders(res);
        if (this.checkToken(req.body.token)==1) return
        if (jwt.verify(req.get('Token'), '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?').payload[0].type!="Администратор") {res.set(403); return}
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
        });
    }
    auth(req, res) {
        res = this.setHeaders(res);
        sql.connect(config).then(pool => {
            // Stored procedure
            return pool.request()
                .input('login', sql.VarChar(24), req.body.login)
                .input('password', sql.VarChar(99), req.body.password)
                .execute('auth')
        }).then(result => {
            if(result.recordset==''){res.status(403).send("invalid pass or login");return}
            console.dir(result)
            let payload = result.recordset
            let token = jwt.sign({payload}, '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?', { algorithm: 'HS512' });
            payload.push(token);
            res.send(payload)
        }).catch(err => {
            console.dir(err)
        });
    }

    setHeaders(res) {
        res.set({'X-Content-Type-Options':'nosniff',
            'Access-Control-Allow-Origin':'*'})
        return res
    }
    checkToken(token) {
        try {
            var decoded = jwt.verify(token, '+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?');
            return 0;
        } catch(err) {
            return 1;
        }
    }
    generateStrongPassword() {
        const maxLength = 90;
        const minLength = 60;
        const uppercaseMinCount = 6;
        const lowercaseMinCount = 6;
        const numberMinCount = 4;
        const specialMinCount = 4;
        const UPPERCASE_RE = /([A-Z])/g;
        const LOWERCASE_RE = /([a-z])/g;
        const NUMBER_RE = /([\d])/g;
        const SPECIAL_CHAR_RE = /([\?\-])/g;
        const NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

        function isStrongEnough(password) {
            const uc = password.match(UPPERCASE_RE);
            const lc = password.match(LOWERCASE_RE);
            const n = password.match(NUMBER_RE);
            const sc = password.match(SPECIAL_CHAR_RE);
            const nr = password.match(NON_REPEATING_CHAR_RE);
            return password.length >= minLength &&
                !nr &&
                uc && uc.length >= uppercaseMinCount &&
                lc && lc.length >= lowercaseMinCount &&
                n && n.length >= numberMinCount &&
                sc && sc.length >= specialMinCount;
        }

        function customPassword() {
            var password = "";
            var randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
            while (!isStrongEnough(password)) {
                password = generatePassword(randomLength, false, /[\w\d\?\-]/);
            }
            return password;
        }
        return customPassword();
    }
}


// Экспортируем наш класс наружу
module.exports = Application;

