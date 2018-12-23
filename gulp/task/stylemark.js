const isProduction = require('./../helpers/isProduction');

const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('stylemark', isProduction() ? $.shell.task('npm run styleguide') : $.shell.task('npm run styleguide-devel'));