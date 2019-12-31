const webpack = require('webpack');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins');
const config = require('../../webpack.dev');

const $ = plugins();

gulp.task('webpack', function (callback) {
    console.info('Webpack compile');

    let isReady = false;

    const onError = $.notify.onError(function (error) {
        return {
            title: 'JS error!',
            message: error,
            sound: 'Beep'
        };
    });

    webpack(config, function (error, stats) {
        /* var jsonStats = stats.toJson();
        var errors = jsonStats.errors;
        var warnings = jsonStats.warnings;

        if (error) {
            onError(error);
        } else if (errors.length > 0) {
            // this directive was disabled because webpack used FriendlyErrorsWebpackPlugin for the error message
            // onError(errors.toString());
        } else if (warnings.length > 0) {
            onError(warnings.toString());
        } else {
            console.log('[webpack]', stats.toString(config.webpack.stats));
        } */

        if (!isReady) {
            callback();
        }

        return (isReady = true);
    });

    // callback();
});