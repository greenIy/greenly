const fs = require('fs');

module.exports = {
    devServer: {
        port: 8080, // CHANGE YOUR PORT HERE!
	allowedHosts: 'all'
    },
    chainWebpack: config => {
	config.optimization.sideEffects(false);
	config.optimization.runtimeChunk(true);
    },
}
