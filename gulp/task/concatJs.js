const config = require('./../helpers/getConfig');
const isProduction = require('./../helpers/isProduction');
const console = require('better-console');

const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

const $ = plugins();

const args = [];

const streamConcatJS = (src, dist, name, callBack) => {

    console.log(src, dist, name, callBack);

    const stream = gulp.src(src);

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
            path: name + '.js',
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
        .on('finish', () => callBack());
};

Object.keys(config.optionsJs.concat).forEach(item => {
    args.push((callBack) => {
        streamConcatJS(config.optionsJs.concat[item].src, config.optionsJs.concat[item].dist, item, callBack);
    });
});

gulp.task('concatJs', gulp.series(...args));