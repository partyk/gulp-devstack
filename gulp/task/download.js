const config = require('./../helpers/getConfig');
const gulp = require('gulp');

const plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('download', (callback) => {
    const stream = $.downloadStream(config.downloadFiles);

    stream
        .on('error', (e) => {
            throw new Error(e);
            process.exit(1); // eslint-disable-line
        })
        .pipe(gulp.dest(config.basePath.temp + 'download'))
        .on('finish', callback);
});