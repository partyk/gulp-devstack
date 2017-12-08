/**
 * require-dir Node.js helper pro nacteni adresare
 * @link https://github.com/aseemk/requireDir
 */
var requireDir = require('require-dir');
const gulp = require('gulp');
const path = require('path');

//nactu vsechny nastaveni z adresare 
requireDir('./gulpTask', {
	recurse: true //nastavim true pro recursivni nacitani
});





const __path = {
    src: path.resolve(__dirname, 'src'),
    dest: path.resolve(__dirname, 'dist'),
    dist: path.resolve(__dirname, 'dist')
}