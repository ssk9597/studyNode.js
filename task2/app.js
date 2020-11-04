//modules
const express = require('express');

//controllers
const indexController = require('./controllers/index');
const loginController = require('./controllers/login');
const registerController = require('./controllers/register');

//models

//Object
const app = express();

//templateEngine
app.set('view engine', 'ejs');

//publicFolderUse
app.use('/public', express.static(__dirname + '/public'));

//routing
app.get('/', indexController);
app.get('/login', loginController);
app.get('/register', registerController);

//server
app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});
