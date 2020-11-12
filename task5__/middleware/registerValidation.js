const { check } = require('express-validator');

module.exports = [
    check('name').not().isEmpty().withMessage('ユーザー名は必須項目です'),
    check('email')
        .not()
        .isEmpty()
        .withMessage('メールアドレスは必須項目です')
        .isEmail()
        .withMessage('メールアドレスを入力してください'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('パスワードは必須項目です')
        .isLength({ min: 7 })
        .withMessage('パスワードは7文字以上で入力してください'),
    check('confirmPassword')
        .not()
        .isEmpty()
        .withMessage('パスワード確認用は必須項目です')
        .isLength({ min: 7 })
        .withMessage('パスワード確認用は7文字以上で入力してください')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('パスワードが確認用と違います'),
];
