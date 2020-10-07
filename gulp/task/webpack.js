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

/* gulp.task('webpack', (callback) => {
    console.info('Webpack compile');
    const config = isProduction() ? webpackProd : webpackDev;
    // eslint-disable-next-line handle-callback-err
    webpack(config, (error, stats) => {
        const jsonStats = stats.toJson();
        if (isProduction() && jsonStats.errors.length > 0) {
            console.error(jsonStats.errors.toString());
            process.exit(1);
        } else {
            callback();
        }
    });
}); */

gulp.task('webpack', (callback) => {
    console.info('Webpack compile');
    const config = isProduction() ? webpackProd : webpackDev;
    return new Promise((resolve, reject) => {
        webpack(config, (error, stats) => {
            if (error) {
                return reject(error);
            }
            if (stats.hasErrors()) {
                return reject(new Error(stats.compilation.errors.join('\n')));
            }
            resolve();
        });
    });
});