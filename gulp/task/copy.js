const config = require('./../helpers/getConfig');
const console = require('better-console');

const gulp = require('gulp');

const copy = require('copy');

const plugins = require('gulp-load-plugins');

const $ = plugins();

const streamCopy = (name, src, dist, callback) => {
    console.info(`${name} > copy of files`);
    copy(src, dist, callback);
}

gulp.task('copy', (callback) => {
    const options = [
        'Copy',
        [config.app.fonts.root + '**/*'],
        config.basePath.temp + 'assets',
        callback
    ];

    streamCopy(...options);
});