const { check } = require('express-validator');

module.exports = [
    check('title').not().isEmpty().withMessage('タイトルは必須項目です'),
    check('content')
        .not()
        .isEmpty()
        .withMessage('コンテンツは必須項目です')
        .isLength({ max: 140 })
        .withMessage('コンテンツは140文字以内で入力してください'),
];
