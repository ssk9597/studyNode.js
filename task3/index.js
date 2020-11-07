//modules
const express = require('express');
const ejs = require('ejs');
const request = require('request');

//controllers
const pageIndexController = require('./controllers/pageIndex');
const loadQuestionController = require('./controllers/loadQuestion');

//global
global.questionsArray = [];

//object
const app = express();

//templateEngine
app.set('view engine', 'ejs');

//publicUse
app.use('/public', express.static(__dirname + '/public'));

//routing
app.get('/', pageIndexController);

//load
app.get('/start', loadQuestionController);

//server
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
