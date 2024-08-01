const http = require('http');
const express = require('express');
const path = require('path');

const StaticServer = {};

StaticServer.run = (port) => {
    const app = express();
    app.use(express.static(path.resolve(__dirname, '../')));
    const httpServer = http.createServer(app);
    httpServer.listen(port);
    console.log('Static服务器正在运行 [端口 - ' + port + ', http]...');
    console.log('访问地址：http://127.0.0.1:' + port);
    StaticServer.server = httpServer;
    StaticServer.app = app;
    StaticServer.port = port;
    StaticServer.protocol = 'http';
}

module.exports = StaticServer;