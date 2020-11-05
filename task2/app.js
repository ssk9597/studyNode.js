//modules
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//controllers
// for routing
const indexController = require('./controllers/index');
const loginController = require('./controllers/login');
const registerController = require('./controllers/register');
//for registerForm
const storeRegisterController = require('./controllers/storeRegister');

//Object
const app = express();

//templateEngine
app.set('view engine', 'ejs');

//publicFolderUse
app.use('/public', express.static(__dirname + '/public'));
//moduleUse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DB接続（データベース名：node_task2）
mongoose.connect('mongodb://localhost/node_task2', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//routing
app.get('/', indexController);
app.get('/login', loginController);
app.get('/register', registerController);

//post
app.post('/users/register', storeRegisterController);

//server
app.listen(5000, () => {
    console.log(`http://localhost:5000`);
});
