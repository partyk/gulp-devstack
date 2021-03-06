const config = require('./../helpers/getConfig');
const isProduction = require('./../helpers/isProduction');
const handler = require('./../helpers/handler');
const console = require('better-console');

const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('less', (callback) => {
    console.info('LESS > compile less to css');

    // nastavim config pro sass stream
    const settings = {
        postCssPlugins: [
            require('postcss-discard-duplicates')(),
            require('pixrem')({rootValue: config.fontSize}), // rem -> px fallback, defaultni hodnota pro vypocet je 10px
            require('autoprefixer')({
                grid: true
            })// , // pridani prefixu
            // require('postcss-will-change')(),
            // require('postcss-color-rgba-fallback')(),
            // require('postcss-opacity')(),
            // require('postcss-pseudoelements')(),
            // require('postcss-vmin')(),
        ],
        less: {
            useFileCache: true // enabled cache file
        }
    };

    // pridam do postCssPluginy pro produkci
    if (isProduction()) {
        settings.postCssPlugins = settings.postCssPlugins.concat([
            require('cssnano')()
        ]);
    }

    // vytvorim cestu + filtr na soubory
    const src = config.app.less.src + '**/*.+(less)';

    const stream = gulp.src(src, {
        // since: gulp.lastRun('less') // This option takes a timestamp, and gulp.src will filter files that are older than the given time.
    });

    stream
    // nastavim plumber a v pripade chyby volam callback onError
        .pipe($.plumber({
            errorHandler: (error) => {
                handler.error(error, callback);
            }
        }))
        // sourcemaps init
        .pipe(
            isProduction()
                ? $.noop()
                : $.sourcemaps.init()
        )
        // kompilace less
        .pipe($.less(settings.less))
        // postcss
        .pipe($.postcss(settings.postCssPlugins))
        // vygeneruji sourcemaps
        .pipe(
            isProduction()
                ? $.noop()
                : $.sourcemaps.write('./')
        )
        // zastavim plumber
        .pipe($.plumber.stop())
        // vygeneruji CSS soubory
        .pipe(gulp.dest(config.dist.styles.root))
        .on('finish', callback);
});