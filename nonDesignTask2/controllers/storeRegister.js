const Register = require('../models/UserRegister');

module.exports = (req, res) => {
    //initialize
    errorMessage = [];
    username = '';

    //validation
    const abovePassword = req.body.password.length >= 7 && req.body.confirmPassword.length >= 7;
    const matchPassword = req.body.password == req.body.confirmPassword;
    const allInput =
        req.body.name != '' &&
        req.body.email != '' &&
        req.body.password != '' &&
        req.body.confirmPassword != '';

    //validationResult&errorMessage
    if (abovePassword && matchPassword && allInput) {
        //username(index.ejs)
        username = req.body.name;
        //DB
        Register.create(req.body, (err, register) => {
            res.redirect('/');
        });
    } else {
        if (!abovePassword) {
            const abovePasswordMessage = 'パスワードの文字数がたりません';
            errorMessage.push(abovePasswordMessage);
        }
        if (!matchPassword) {
            const matchPasswordMessage = 'パスワードが確認用と違います';
            errorMessage.push(matchPasswordMessage);
        }
        if (!allInput) {
            const allInputMessage = 'すべての入力欄を記入してください';
            errorMessage.push(allInputMessage);
        }
        res.redirect('/register');
    }
};
