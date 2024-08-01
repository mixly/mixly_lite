const StaticServer = require('./static-server.js');
const SSLStaticServer = require('./static-sslserver.js');

const init = () => {
    StaticServer.run('7000');
    SSLStaticServer.run('8000');
}

if (!module.parent) {
    init();
} else {
    module.exports = init;
}