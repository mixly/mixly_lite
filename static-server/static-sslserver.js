const https = require('https');
const express = require('express');
const fs = require('fs');
const path = require('path');
 
const SSLStaticServer = {};

SSLStaticServer.run = (port) => {
    const KEY_PATH = path.resolve(__dirname, './certs/server.key');
    const CRT_PATH = path.resolve(__dirname, './certs/server.crt');
    const options = {
        key: fs.readFileSync(KEY_PATH),
        cert: fs.readFileSync(CRT_PATH)
    };
    const app = express();
    app.use(express.static(path.resolve(__dirname, '../')));
    const httpsServer = https.createServer(options, app);
    httpsServer.listen(port);
    console.log('Static服务器正在运行 [端口 - ' + port + ', https]...');
    console.log('访问地址：https://127.0.0.1:' + port);
    SSLStaticServer.server = httpsServer;
    SSLStaticServer.app = app;
    SSLStaticServer.port = port;
    SSLStaticServer.protocol = 'https';
}

module.exports = SSLStaticServer;
