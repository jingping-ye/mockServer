const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//  引入路由文件
require('./mock/index')(app);

//  指定端口
const PORT = 8081;

app.listen(PORT, () => {
  console.log(`服务器启动，运行为http://localhost:${PORT}`);
});
