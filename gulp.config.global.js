let path = require('path');

let basePath = {
	src: path.resolve(__dirname, 'app'),
	dest: path.resolve(__dirname, 'dist'),
    dist: path.resolve(__dirname, 'dist'),
    temp: path.resolve(__dirname, 'temp', 'gulp')
};

let src = {
    less: path.resolve(basePath.src, 'less'),
    sass : {
        root: path.resolve(basePath.src, 'sass'),
        src: path.resolve(basePath.src, 'sass', 'src')
    },
    scripts: path.resolve(basePath.src, 'js'),
    images:path.resolve(basePath.src, 'images'),
};

let dest = {
    style: path.resolve(basePath.dest, 'css'),
    scripts: path.resolve(basePath.dest, 'js'),
	images: path.resolve(basePath.dest, 'images'),
};

let dist = {
    style: path.resolve(basePath.dist, 'css'),
    scripts: path.resolve(basePath.dist, 'js'),
	images: path.resolve(basePath.dist, 'images'),
};

//podpora prohlizece
let browser = ['> 2% in CZ', 'last 3 version', 'ios >= 7', 'Explorer >= 10'];

//velikost vychoziho pisma
let fontSize = 10;

module.exports = {
	basePath: basePath,
	src: src,
    dest: dest,
	dist: dist,
    browser: browser,
    fontSize: fontSize
};