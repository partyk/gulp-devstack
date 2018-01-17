let config = require('./../helpers/getConfig');
let isProduction = require('./../helpers/isProduction');
let consoleLog = require('./../helpers/consoleLog');

let path = require('path');
let fs = require('fs');
let gulp = require('gulp');
let gutil = require('gulp-util');
let clean = require('gulp-clean');
let notify = require('gulp-notify');
let plumber = require('gulp-plumber');

gulp.task('clean', (callback) => {
    consoleLog.info('Delete > ' + config.basePath.dist);

    if (!fs.existsSync(config.basePath.dist)) {
        consoleLog.warn('Clean warn -> directory "' + config.basePath.dist + '" not exist!');
        callback();
        return;
    }

    //callBack error
    let onError = function (error) {
        notify.onError({
            title: 'Clean error!',
            message: '<%= error.message %>',
            sound: 'Beep',
        })(error);

        return this.emit('end');
    };

    let stream = gulp.src(config.basePath.dist, { read: false });

    stream
        //nastavim plumber a v pripade chyby volam callback onError
        .pipe(plumber({
            errorHandler: onError,
        }))
        .pipe(clean());

    callback();
});