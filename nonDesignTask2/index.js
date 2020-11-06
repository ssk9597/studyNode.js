//modules
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

//controllers
const pageIndexController = require('./controllers/pageIndex');
const pageLoginController = require('./controllers/pageLogin');
const pageRegisterController = require('./controllers/pageRegister');

//models
const Register = require('./models/UserRegister');

//global
global.errorMessage = [];
global.username = '';

//object
const app = express();

//templateEngine
app.set('view engine', 'ejs');

//moduleUse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.post(
    '/form',
    [
        check('name').not().isEmpty(),
        check('email').not().isEmpty(),
        check('password').not().isEmpty().isLength({ min: 7 }),
        check('confirmPassword').not().isEmpty().isLength({ min: 7 }),
    ],
    (req, res) => {
        //initialize
        errorMessage = [];
        username = '';

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            if (
                check('password').not().isLength({ min: 7 }) &&
                check('confirmPassword').not().isLength({ min: 7 })
            ) {
                const abovePasswordMessage = 'パスワードの文字数がたりません';
                errorMessage.push(abovePasswordMessage);
            }
            if (req.body.password != req.body.confirmPassword) {
                const matchPasswordMessage = 'パスワードが確認用と違います';
                errorMessage.push(matchPasswordMessage);
            }
            if (
                check('name').isEmpty() ||
                check('email').isEmpty() ||
                check('password').isEmpty() ||
                check('confirmPassword').isEmpty()
            ) {
                const allInputMessage = 'すべての入力欄を記入してください';
                errorMessage.push(allInputMessage);
            }
            res.redirect('/register');
        } else {
            //username(index.ejs)
            username = req.body.name;
            //DB
            Register.create(req.body, (err, register) => {
                res.redirect('/');
            });
        }
    }
);

//server
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
