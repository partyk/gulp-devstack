const config = require('./../helpers/getConfig');
const isProduction = require('./../helpers/isProduction');
const console = require('better-console');

const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('dependencyJs', (callBack) => {
    console.info('Concat > ' + config.concatJs.dependencyJs.name);

    if (config.concatJs.dependencyJs.files.length === 0) {
        console.warn('Concat dependency warn -> Mising files for concat!');
        callBack();
        return;
    }

    const dist = config.dist.scripts.static + config.concatJs.dependencyJs.name;

    const stream = gulp.src(config.concatJs.dependencyJs.files);

    stream
    // nastavim plumber a v pripade chyby volam callback onError
        .on('error', (e) => {
            throw new Error(e);
            process.exit(1); // eslint-disable-line
        })
        // sourcemaps init
        .pipe(
            isProduction()
                ? $.noop()
                : $.sourcemaps.init()
        )
        .pipe($.concat({
            path: dist,
            stat: {
                // mode: 0666
            }
        }))
        // vygeneruji sourcemaps
        .pipe(
            isProduction()
                ? $.noop()
                : $.sourcemaps.write('./')
        )
        // vygeneruji soubor
        .pipe(gulp.dest(dist))
        .on('finish', callBack);
});