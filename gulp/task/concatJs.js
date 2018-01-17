let config = require('./../helpers/getConfig');
let isProduction = require('./../helpers/isProduction');
let consoleLog = require('./../helpers/consoleLog');

let path = require('path');
let gulp = require('gulp');
let concat = require('gulp-concat');
let sourcemaps = require('gulp-sourcemaps');
let notify = require('gulp-notify');
let plumber = require('gulp-plumber');

gulp.task('dependency', (callBack) => {

    consoleLog.info('Concat > ' + config.concatJs.dependencyJs.name);

    //callBack error
    let onError = function (error) {
        notify.onError({
            title: 'Concat error!',
            message: '<%= error.message %>',
            sound: 'Beep',
        })(error);

        return this.emit('end');
    };

    //vytvorim cestu + filtr na soubory
    let dist = path.format({
        dir: config.dist.scripts.static,
        base: config.concatJs.dependencyJs.name
    });

    if (config.concatJs.dependencyJs.files.length === 0) {
        consoleLog.warn('Concat dependency warn -> Mising files for concat!');
        callBack();  
        return;     
    }

    let stream = gulp.src(config.concatJs.dependencyJs.files);

    stream
        //nastavim plumber a v pripade chyby volam callback onError
        .pipe(plumber({
            errorHandler: onError,
        }))
        //sourcemaps init
        .pipe(
            isProduction()
                ? gutil.noop()
                : sourcemaps.init()
        )
        .pipe(concat({
            path: dist,
            stat: {
                //mode: 0666 
            }
        }))
        //vygeneruji sourcemaps
        .pipe(
            isProduction()
                ? gutil.noop()
                : sourcemaps.write('./')
        )
        //zastavim plumber
        .pipe(plumber.stop())
        //vygeneruji CSS soubory
        .pipe(gulp.dest(dist));

    callBack();
});