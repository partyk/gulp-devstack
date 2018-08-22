let config = require('./../helpers/getConfig');
let isProduction = require('./../helpers/isProduction');
let handler = require('./../helpers/handler');
let console = require('better-console');

let gulp = require('gulp');
let plugins = require('gulp-load-plugins');

const $ = plugins();

let fs = require("fs");

gulp.task('extendsjs', (callback) => {

    console.info('Extends JavaScript');

    // load options from .babelrc
    let babelrc = JSON.parse(fs.readFileSync('.babelrc'));

    // source path for javascript
    let src = config.optionsJs.extends;

    // target part for javascript
    let dist = config.dist.scripts.extends;

    let stream = gulp.src(src, {
        // since: gulp.lastRun('extendsjs') // This option takes a timestamp, and gulp.src will filter files that are older than the given time.
    });

    stream
        .pipe($.plumber({
            errorHandler: handler.error,
        }))
        // .on('error', (error) => {
        //     console.error(error)
        // })
        // source maps init
        .pipe(
            isProduction()
                ? $.noop()
                : $.sourcemaps.init()
        )
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe($.eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe($.eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        // .pipe($.eslint.failAfterError())
        // babel compiler
        .pipe($.babel(babelrc))
        .pipe(
            isProduction()
                ? $.uglify(config.optionsUglify)
                : $.noop()
        )
        // generate source maps
        .pipe(
            isProduction()
                ? $.noop()
                : $.sourcemaps.write('./')
        )
        // stop plumber
        .pipe($.plumber.stop())
        // generate extends of javascript files
        .pipe(gulp.dest(dist))
        .on('finish', callback);
});