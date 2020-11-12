//modules
const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

//controllers
const pageIndexController = require('./controllers/pageIndex');
const pageLoginController = require('./controllers/pageLogin');
const pageLogoutController = require('./controllers/pageLogout');
const pageRegisterController = require('./controllers/pageRegister');
const storeRegisterController = require('./controllers/storeRegister');
const storeLoginController = require('./controllers/storeLogin');

//middleware
const loginValidationMiddleware = require('./middleware/loginValidation');
const registerValidationMiddleware = require('./middleware/registerValidation');

//global
global.activeUser = '';
global.loginErrorMessage = [];
global.registerErrorMessage = [];

//Object
const app = express();

//templateEngine
app.set('view engine', 'ejs');

//publicUse(npm run css)
app.use('/public', express.static(__dirname + '/public'));
//modulesUse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    expressSession({
        secret: 'keyboard',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 180000,
        },
    })
);

//routing
app.get('/', pageIndexController);
app.get('/login', pageLoginController);
app.get('/register', pageRegisterController);
app.get('/form/logout', pageLogoutController);

//post
app.post('/form/register', registerValidationMiddleware, storeRegisterController);
app.post('/form/login', loginValidationMiddleware, storeLoginController);

//server
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
