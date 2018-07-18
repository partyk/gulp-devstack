let config = require('./../helpers/getConfig');
// let isProduction = require('./../helpers/isProduction');
let console = require('better-console');

let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let jpegoptim = require('imagemin-jpegoptim');
let pngquant = require('imagemin-pngquant');

gulp.task('imagemin', (callback) => {

    console.info('Imagemin > minifying of images');

    let stream = gulp.src([
            '**/*.{png,jpg,gif,svg,ico}',
            //'!' + config.app.images.extends,
        ], {
            cwd: config.app.images.root,
            // since: gulp.lastRun('imagemin') // This option takes a timestamp, and gulp.src will filter files that are older than the given time.
        });

    stream
        .on('error', (e) => {
            throw new Error(e);
        })
        .pipe(imagemin([
            jpegoptim({
                progressive: true,
            }),
            pngquant(),
            imagemin.gifsicle(),
            imagemin.svgo(),
        ]))
        .pipe(gulp.dest(config.dist.images.root))
        .on('finish', callback);
});