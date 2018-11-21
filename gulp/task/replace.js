const config = require('./../helpers/getConfig');
const console = require('better-console');
const handler = require('./../helpers/handler');

const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('replace', (callback) => {
    console.info('Replace > replace path in files');
    const stream = gulp.src(config.app.less.root + 'test/**/*.less');

    stream
        .pipe($.plumber({
            errorHandler: (error) => {
                handler.error(error, callback);
            }
        }))
        .pipe($.replace('../../img/test/', config.publicPath.images.root))
        .pipe($.replace('../../pictures/test/', config.publicPath.images.root))
        .pipe($.plumber.stop())
        .pipe(gulp.dest(config.basePath.temp + 'less'))
        .on('finish', callback);
});