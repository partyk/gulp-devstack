const isProduction = require('./../helpers/isProduction');

const gulp = require('gulp');
const plugins = require('gulp-load-plugins');
const argv = require('minimist')(process.argv.slice(2));

const $ = plugins();

gulp.task('stylemark', argv.doc ? isProduction() ? $.shell.task('npm run styleguide') : $.shell.task('npm run styleguide-devel') : callback => { callback() });