//modules
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

//controllers
const pageIndexController = require('./controllers/pageIndex');
const pageLoginController = require('./controllers/pageLogin');
const pageRegisterController = require('./controllers/pageRegister');
const pageLogoutController = require('./controllers/pageLogout');
const storeRegisterController = require('./controllers/storeRegister');

//middleware
const validationMiddleware = require('./middleware/validation');

//global
global.errorMessage = [];
global.username = '';

//object
const app = express();

//templateEngine
app.set('view engine', 'ejs');

//publicUse(npm run css)
app.use('/public', express.static(__dirname + '/public'));
//moduleUse
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

//DB
mongoose.connect('mongodb://localhost/node_task2', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//routing
app.get('/', pageIndexController);
app.get('/login', pageLoginController);
app.get('/register', pageRegisterController);
app.get('/form/logout', pageLogoutController);

//post
app.post('/form/register', validationMiddleware, storeRegisterController);

//server
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
