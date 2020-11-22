//modules
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

//controllers
//pages
const pageIndexController = require('./controllers/pageIndex');
const pageLoginController = require('./controllers/pageLogin');
const pageLogoutController = require('./controllers/pageLogout');
const pagePostController = require('./controllers/pagePost');
const pageRegisterController = require('./controllers/pageRegister');
//store
const storeRegisterController = require('./controllers/storeRegister');
const storeLoginController = require('./controllers/storeLogin');
const storePostController = require('./controllers/storePost');

//middleware
const jwtAuthMiddleware = require('./middleware/jwtAuth');
const loginValidationMiddleware = require('./middleware/loginValidation');
const registerValidationMiddleware = require('./middleware/registerValidation');
const postValidationMiddleware = require('./middleware/postValidation');

//global
global.loginErrorMessage = [];
global.registerErrorMessage = [];
global.postErrorMessage = [];

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
app.use(cookieParser());

//routing
app.get('/', jwtAuthMiddleware, pageIndexController);
app.get('/login', pageLoginController);
app.get('/register', pageRegisterController);
app.get('/logout', jwtAuthMiddleware, pageLogoutController);
app.get('/post', jwtAuthMiddleware, pagePostController);

//post
app.post('/register', registerValidationMiddleware, storeRegisterController, storeLoginController);
app.post('/login', loginValidationMiddleware, storeLoginController);
app.post('/post', postValidationMiddleware, storePostController);

//server
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
