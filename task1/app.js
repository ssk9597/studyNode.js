const express = require('express');
const app = express();

//テンプレートエンジン（ejsを使えるように）
app.set('view engine', 'ejs');

//public内のCSSなどが使えるように(npm run css)
app.use('/public', express.static(__dirname + '/public'));

//ポート番号
const port = 8080;

//ルーティングのインポート
app.use('/', require('./routes/index.js'));
app.use('/login', require('./routes/index.js'));

app.listen(port, () => {
    console.log(`サーバを起動しました。（ポート番号: ${port}）`);
});
