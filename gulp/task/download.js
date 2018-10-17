const config = require('./../helpers/getConfig');
const isProduction = require('./../helpers/isProduction');

const gulp = require('gulp');

const plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('download', (callback) => {

    const stream = $.downloadStream(config.downloadFiles);

    stream
        .pipe(gulp.dest(config.basePath.temp + "download"))
        .on('finish', callback);
});