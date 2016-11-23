/**
 *
 * @description 简单的服务端测试
 * @author 王镇佳 <wzjfloor@163.com>
 *
 */

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const compression = require('compression');

app.set('views', path.join(__dirname, '../src/app-angular/'));
app.set('view engine', 'jade');

app.use(compression());


let env = process.env.NODE_ENV || 'production';
let data = {};

if (env === 'development') {
  data = { dev: true };
} else {
  data = { pro: true };
}

app.use(express.static(path.join(__dirname, '../../public')));
console.log(__dirname);
let dir = '../../public/app-angular/self/views/app.client.view.html';
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, dir));
});

let port = 3002;

app.listen(port, function() {
  console.log(`SimpleFoodStore 开发服务器启动，正在监听端口：${port}，环境变量是：${env}`);
});
