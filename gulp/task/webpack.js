const isProduction = require('./../helpers/isProduction');
const console = require('better-console');

// gulp dependencies
const gulp = require('gulp');

// webpeck depedencies
const webpack = require('webpack');
// webpack config
const webpackDev = require('./../../webpack.dev');
const webpackProd = require('./../../webpack.prod');

gulp.task('webpack', (callback) => {
    console.info('Webpack compile');
    webpack(isProduction() ? webpackProd : webpackDev, () => callback());
});