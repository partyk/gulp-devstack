const config = require('./../helpers/getConfig');
const console = require('better-console');

const gulp = require('gulp');

const plugins = require('gulp-load-plugins');

const $ = plugins();

const streamCopy = (name, src, dist, callback, options = {prefix: 1}) => {
    console.info(`${name} > copy of files`);

    console.log(src);

    let stream = gulp.src(...src);

    stream
        .pipe($.copy(dist, options))

    callback();
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