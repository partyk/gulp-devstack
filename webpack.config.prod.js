const path = require('path');
const config = {
    dir: {
        src: 'app',
        dist: 'dist'
    },
    path: {
        src: path.resolve(__dirname, 'app'),
        dist: path.resolve(__dirname, 'dist'),
        temp: path.resolve(__dirname, 'temp/webpack'),
        assets: path.resolve(__dirname, 'dist'),
        node_modules: path.resolve(__dirname, 'node_modules'),
        publicPath: '/',
        publicPathAssets: '/'
    }
};

module.exports = config;
