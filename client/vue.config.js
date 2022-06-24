const fs = require('fs');

module.exports = {
    devServer: {
        port: 8080, // CHANGE YOUR PORT HERE!
	allowedHosts: 'all'
        /* https: {
            key: fs.readFileSync('./certs/example.com+5-key.pem'),
            cert: fs.readFileSync('./certs/example.com+5.pem'),
            public: 'https://localhost:8080/'
        } */
    },
    chainWebpack: config => {
	config.optimization.sideEffects(false);
	config.optimization.runtimeChunk(true);
    },
}
