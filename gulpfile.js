/**
 * require-dir Node.js helper pro nacteni adresare
 * @link https://github.com/aseemk/requireDir
 */
let requireDir = require('require-dir');
let gulp = require('gulp');
let gutil = require('gulp-util');
let isProduction = require('./gulpTask/helpers/isProduction');

gutil.log(
    gutil.colors.bgGreen('====',  isProduction() ? 'Run production mode' : 'Run developer mode', '====')
)

//nactu vsechny nastaveni z adresare 
requireDir('./gulpTask', {
	recurse: true //nastavim true pro recursivni nacitani
});