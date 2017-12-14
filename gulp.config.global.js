let path = require('path');

let dirName = {
    root: '/',
    temp: 'temp',
    app: 'app',
    src: 'src',
    dist: 'dist',
    scripts: 'js',
    styles: 'css',
    images: 'images',
    fonts: 'fonts',
    extends: 'extends'
}

let basePath = {
    app: path.resolve(__dirname, dirName.app),
    dist: path.resolve(__dirname, dirName.dist),
    temp: path.resolve(__dirname, dirName.temp, 'gulp'),
    nodeModule: path.resolve(__dirname, 'node_modules'),
    bowerComponents: path.resolve(__dirname, 'bower_components'),
};

let publicPath = {
    root: '/',
    dist: path.resolve(dirName.dist),
    styles: {
        root: path.resolve(dirName.dist, dirName.styles),
        extends: path.resolve(dirName.dist, dirName.styles, dirName.extends),
    },
    scripts: {
        root: path.resolve(dirName.dist, dirName.scripts),
        extends: path.resolve(dirName.dist, dirName.scripts, dirName.extends),
    }
}

let app = {
    less: {
        root: path.resolve(basePath.app, 'less'),
        src: path.resolve(basePath.app, 'less', dirName.src)
    },
    sass: {
        root: path.resolve(basePath.app, 'sass'),
        src: path.resolve(basePath.app, 'sass', dirName.src)
    },
    scripts: {
        root: path.resolve(basePath.app, dirName.scripts),
        src: path.resolve(basePath.app, dirName.scripts, dirName.src),
        extends: path.resolve(basePath.app, dirName.scripts, dirName.extends)
    },
    images: {
        root: path.resolve(basePath.app, dirName.root)
    }
};

let dist = {
    styles: {
        root: path.resolve(basePath.dist, dirName.styles),
        extends: path.resolve(basePath.dist, dirName.styles, dirName.extends)
    },
    scripts: {
        root: path.resolve(basePath.dist, dirName.scripts),
        extends: path.resolve(basePath.dist, dirName.scripts, dirName.extends)
    },
    images: {
        root: path.resolve(basePath.dist, dirName.images),
    }
};

let webpack = {
	stats: {
		colors: true,
		hash: false,
		timings: true,
		assets: true,
		chunks: false,
		chunkModules: false,
		modules: false,
		children: true,
		version: false,
	},
};

//podpora prohlizece
let browser = ['> 2% in CZ', 'last 3 version', 'iOs >= 7', 'Explorer >= 10'];

//velikost vychoziho pisma
let fontSize = 10;

module.exports = {
    basePath: basePath,
    app: app,
    dist: dist,
    webpack: webpack,
    browser: browser,
    fontSize: fontSize
};