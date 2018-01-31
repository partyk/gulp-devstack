let config = require('./../helpers/getConfig');
let isProduction = require('./../helpers/isProduction');
let console = require('better-console');

let gulp = require('gulp');
let plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('dependencyJs', (callBack) => {

    console.info('Concat > ' + config.concatJs.dependencyJs.name);

    if (config.concatJs.dependencyJs.files.length === 0) {
        console.warn('Concat dependency warn -> Mising files for concat!');
        callBack();  
        return;     
    }

    let dist = config.dist.scripts.static + config.concatJs.dependencyJs.name;

    let stream = gulp.src(config.concatJs.dependencyJs.files);

    stream
        //nastavim plumber a v pripade chyby volam callback onError
        .on('error', (e) => {
            throw new Error(e);
            stream.end();
        })
        //sourcemaps init
        .pipe(
            isProduction()
                ? $.util.noop()
                : $.sourcemaps.init()
        )
        .pipe($.concat({
            path: dist,
            stat: {
                //mode: 0666 
            }
        }))
        //vygeneruji sourcemaps
        .pipe(
            isProduction()
                ? $.util.noop()
                : $.sourcemaps.write('./')
        )
        //vygeneruji soubor
        .pipe(gulp.dest(dist))
        .on('finish', callback);
});