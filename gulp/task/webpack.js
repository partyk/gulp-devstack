const isProduction = require('./../helpers/isProduction');
const console = require('better-console');
const process = require('process');

// gulp dependencies
const gulp = require('gulp');

// webpeck depedencies
const webpack = require('webpack');
// webpack config
const webpackDev = require('./../../webpack.dev');
const webpackProd = require('./../../webpack.prod');

gulp.task('webpack', (callback) => {
    console.info('Webpack compile');
    webpack(isProduction() ? webpackProd : webpackDev, (error, stats) => {
        const jsonStats = stats.toJson();
        if (isProduction() && jsonStats.errors) {
            console.error(jsonStats.errors.toString());
            process.exit(1);
        } else {
            callback();
        }
    });
});