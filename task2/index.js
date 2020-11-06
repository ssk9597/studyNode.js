//modules
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//controllers
const pageIndexController = require('./controllers/pageIndex');
const pageLoginController = require('./controllers/pageLogin');
const pageRegisterController = require('./controllers/pageRegister');
const storeRegisterController = require('./controllers/storeRegister');

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

//DB
mongoose.connect('mongodb://localhost/node_nonDesign_task2', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//routing
app.get('/', pageIndexController);
app.get('/login', pageLoginController);
app.get('/register', pageRegisterController);

//post
app.post('/form/register', storeRegisterController);

//server
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
