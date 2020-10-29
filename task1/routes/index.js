//expressのrouterを使えるように
const router = require('express').Router();

//ルーティング
router.get('/', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

//その他でも使えるようにエクスポート
module.exports = router;
